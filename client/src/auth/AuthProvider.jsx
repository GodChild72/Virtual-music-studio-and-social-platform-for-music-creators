import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (!token) return;

    fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        }
      })
      .catch(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      });
  }, [token]);

  function saveToken(nextToken) {
    setToken(nextToken);
    if (nextToken) {
      localStorage.setItem('token', nextToken);
    } else {
      localStorage.removeItem('token');
    }
  }

  function logout() {
    saveToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken: saveToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
