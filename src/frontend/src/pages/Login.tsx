import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../store/useAuthStore";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
    const handleSubmit = async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://127.0.0.1:8000/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ login: username, password }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Login failed");

        setUser(data.user);
        navigate("/main");
      } catch (err: any) {
        setError(err.message);
      }

      setLoading(false);
    };

  return (
    <div className="home-bg dx-auth-bg">
      <div className="stars"></div>
      <div className="dx-auth-grid">
        <div className="dx-auth-hero">
          <h1 className="dx-hero-title">Welcome to DomainX</h1>
          <p className="dx-hero-desc">
            Sign in to access your workspace and evaluation tools.
          </p>
        </div>
        <div className="dx-auth-card">
          <div className="dx-card dx-card-auth" role="main" aria-label="Login form">

            <h3 style={{ marginTop: 0, marginBottom: '1.2rem' }}>Sign in</h3>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>

              <label className="dx-label">
                Username
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="dx-input"
                  autoComplete="username"
                  required
                />
              </label>

              <label className="dx-label">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="dx-input"
                  autoComplete="current-password"
                  required
                />
              </label>

              {error && <div className="dx-error">{error}</div>}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="dx-btn dx-btn-outline"
                  onClick={() => { setUsername(''); setPassword(''); setError(null); }}
                >
                  Clear
                </button>

                <button className="dx-btn dx-btn-primary" type="submit" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
