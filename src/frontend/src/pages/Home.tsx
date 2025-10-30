import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

interface ApiStatus {
  message?: string;
}

const Home: React.FC = () => {
  const [backendStatus, setBackendStatus] = useState<string>('Checking...');
  const [loading, setLoading] = useState<boolean>(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const navigate = useNavigate();

  const endpoint = '/api/status/';

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res: AxiosResponse<ApiStatus> = await axios.get(endpoint, { timeout: 5000 });
      setBackendStatus(res.data?.message ?? 'Django backend is successfully connected');
    } catch (err) {
      setBackendStatus('Connection Failed: Check Django server or CORS settings.');
    } finally {
      setLastChecked(new Date());
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleRefresh = () => fetchStatus();
const openApi = () => {
  window.open('http://localhost:8000/api/status/', '_blank', 'noopener,noreferrer');
};

  const goToLogin = () => navigate('/login');

  const isConnected = backendStatus.toLowerCase().includes("successfully connected");


  return (
    <div className="dx-bg">
      <div className="dx-card dx-card-centered" role="region" aria-label="DomainX status card">
        <header className="dx-card-header" style={{ justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div className="dx-logo" aria-hidden>
              <svg viewBox="0 0 100 100" width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <polygon points="50,8 88,30 88,70 50,92 12,70 12,30" fill="rgba(255,255,255,0.12)" stroke="white" strokeOpacity="0.9"/>
                <text x="50" y="58" fontSize="26" textAnchor="middle" fill="white" fillOpacity="0.9" fontFamily="sans-serif" fontWeight="700">DX</text>
              </svg>
            </div>
            <div className="dx-title">
              <div className="dx-main-title">DomainX</div>
              <div className="dx-subtitle">Frontend Application</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              className="dx-btn dx-btn-primary"
              onClick={goToLogin}
              aria-label="Go to login page"
            >
              Sign in
            </button>
          </div>
        </header>

        <section className="dx-status-row">
          <div className="dx-status-left">
            <div className={`dx-spinner ${loading ? 'spin' : ''}`} aria-hidden="true">
              <svg viewBox="0 0 50 50" width="20" height="20" aria-hidden>
                <circle cx="25" cy="25" r="10" stroke="rgba(255,255,255,0.35)" strokeWidth="4" fill="none" />
              </svg>
            </div>

            <div
              className="dx-dot"
              style={{ background: isConnected ? '#10b981' : '#f97316' }}
              aria-hidden
            />

            <div className="dx-status-texts">
              <div className="dx-status-text" title={backendStatus}>{backendStatus}</div>
              <div className="dx-status-sub">
                Last checked: {lastChecked ? lastChecked.toLocaleTimeString() : '—'}
              </div>
            </div>
          </div>

          <div className="dx-actions">
            <button
              className="dx-btn dx-btn-outline"
              onClick={handleRefresh}
              disabled={loading}
              aria-label="Refresh backend status"
            >
              {loading ? 'Checking...' : 'Refresh'}
            </button>

            <button
              className="dx-btn dx-btn-outline"
              onClick={openApi}
              aria-label="Open API endpoint"
            >
              Open API
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;