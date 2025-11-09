import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Visualize from './pages/Visualize';
import Main from "./pages/Main";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/visualize" element={<Visualize />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;