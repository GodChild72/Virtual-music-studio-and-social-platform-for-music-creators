const appSections = [
  'Recording Studio',
  'Multi-track projects',
  'Pro collaboration',
  'Cloud storage',
  'Plans and billing'
];

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">Studio Pro</div>
        <nav className="nav">
          <a href="#">Dashboard</a>
          <a href="#">Projects</a>
          <a href="#">Pricing</a>
          <a href="#">Support</a>
        </nav>
        <button className="primary-button">Get Pro</button>
      </header>

      <main className="hero">
        <section className="hero-copy">
          <p className="eyebrow">Creative tools for modern artists</p>
          <h1>Build, record, mix, and collaborate from one studio.</h1>
          <p className="lede">
            This app shell is the foundation for the Studio Pro product: user auth,
            subscriptions, recording workflows, storage, collaboration, and premium access.
          </p>
          <div className="cta-row">
            <button className="primary-button">Start creating</button>
            <button className="secondary-button">View plans</button>
          </div>
        </section>

        <aside className="status-card">
          <div className="status-header">
            <span className="status-dot" />
            Studio status
          </div>
          <ul>
            {appSections.map((section) => (
              <li key={section}>{section}</li>
            ))}
          </ul>
        </aside>
      </main>

      <section className="feature-grid">
        <article className="feature-card">
          <h2>Recording</h2>
          <p>Capture takes, revise ideas, and organize sessions by project.</p>
        </article>
        <article className="feature-card">
          <h2>Mixing</h2>
          <p>Control gain, pan, layering, and export-ready sessions.</p>
        </article>
        <article className="feature-card">
          <h2>Collaboration</h2>
          <p>Invite collaborators, share drafts, and track feedback.</p>
        </article>
      </section>
    </div>
  );
}
