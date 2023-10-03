import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './component/LoginComp';
import Redirect from './pages/coba';
import Register from './pages/register';
import Home from './pages/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import AddIncome from './pages/AddIncome';
import AddOutcome from './pages/AddOutcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Redirect" element={<Redirect />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/income" element={<ProtectedRoute><AddIncome /></ProtectedRoute>} />
        <Route path="/outcome" element={<ProtectedRoute><AddOutcome /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
