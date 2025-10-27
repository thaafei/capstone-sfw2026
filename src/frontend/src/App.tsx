import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking...');

  useEffect(() => {
    //to forward the request to http://localhost:8000/api/status/
    axios.get('/api/status/')
      .then(response => {
        setBackendStatus(response.data.message);
      })
      .catch(error => {
        console.error("API Connection Error:", error);
        setBackendStatus('Connection Failed: Check Django server or CORS settings.');
      });
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>DomainX Frontend Application</h1>
      <h2>Backend Status: <strong>{backendStatus}</strong></h2>
      <p>If you see "Django backend is successfully connected," your setup is perfect.</p>
    </div>
  );
}

export default App;