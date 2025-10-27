import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [backendStatus, setBackendStatus] = useState('Checking...');

  useEffect(() => {
    axios.get('/api/status/')
      .then(response => setBackendStatus(response.data.message))
      .catch(() => setBackendStatus('Connection Failed: Check Django server or CORS settings.'));
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>DomainX Frontend Application</h1>
      <h2>Backend Status: <strong>{backendStatus}</strong></h2>
      <p>If you see "Django backend is successfully connected," your setup is perfect.</p>
    </div>
  );
}

export default Home;
