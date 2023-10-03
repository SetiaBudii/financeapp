import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './component/LoginComp';
import Redirect from './pages/coba';
import Register from './pages/register';
import Home from './pages/Home';
import NewWallet from './pages/newWallet';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/newWallet" element={<ProtectedRoute><NewWallet /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/Redirect" element={<Redirect />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
