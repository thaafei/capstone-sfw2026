import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Visualize from './pages/Visualize';
import './pages/Home.css'; // shared styles

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/visualize" element={<Visualize />} />
      </Routes>
    </Router>
  );
};

export default App;