import express from 'express';
import Stripe from 'stripe';
import { authMiddleware } from '../middleware/auth.js';
import { readDb, updateUserById } from '../db.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-04-10'
});

router.post('/create-checkout-session', authMiddleware, async (req, res) => {
  const { priceId = 'price_studio_pro_monthly' } = req.body;
  const db = readDb();
  const user = db.users.find((entry) => entry.id === req.user.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const origin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
        plan: 'studio_pro'
      },
      success_url: `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/billing/cancel`,
      allow_promotion_codes: true
    });

    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Unable to create checkout session' });
  }
});

router.get('/status', authMiddleware, (req, res) => {
  const db = readDb();
  const user = db.users.find((entry) => entry.id === req.user.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json({
    plan: user.plan || 'free',
    billingStatus: user.billingStatus || 'free',
    currentPeriodEnd: user.currentPeriodEnd || null
  });
});

export const billingWebhookHandler = async (req, res) => {
  const signature = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  const eventType = event.type;

  if (eventType === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.client_reference_id;
    if (userId) {
      updateUserById(userId, {
        plan: 'studio_pro',
        billingStatus: 'active',
        stripeCustomerId: session.customer || null,
        stripeSubscriptionId: session.subscription || null,
        currentPeriodEnd: null
      });
    }
  }

  if (eventType === 'customer.subscription.updated' || eventType === 'customer.subscription.deleted') {
    const subscription = event.data.object;
    const customerId = subscription.customer;
    const db = readDb();
    const user = db.users.find((entry) => entry.stripeCustomerId === customerId);

    if (user) {
      const active = subscription.status === 'active' || subscription.status === 'trialing';
      updateUserById(user.id, {
        plan: active ? 'studio_pro' : 'free',
        billingStatus: active ? 'active' : 'cancelled',
        stripeSubscriptionId: subscription.id,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString()
      });
    }
  }

  return res.json({ received: true });
};

export default router;
