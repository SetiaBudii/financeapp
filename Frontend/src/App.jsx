import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './component/LoginComp';
import Register from './pages/register';
import Home from './pages/Home';
import NewWallet from './pages/newWallet';
import ProtectedRoute from './routes/ProtectedRoute';
import Income from './pages/Income';
import AddOutcome from './pages/AddOutcome';
import ViewBudget from './pages/ViewBudget';
import Recap from './pages/Recap';
import Wallet from './pages/wallet';
import DelWal from './pages/deleteWallet';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/newWallet" element={<ProtectedRoute><NewWallet /></ProtectedRoute>} />
        <Route path="/deleteWallet" element={<ProtectedRoute><DelWal /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/budgeting" element={<ProtectedRoute><ViewBudget /></ProtectedRoute>} />
        <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
        <Route path="/outcome" element={<ProtectedRoute><AddOutcome /></ProtectedRoute>} />
        <Route path="/budget" element={<ProtectedRoute><ViewBudget /></ProtectedRoute>} />
        <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/recap" element={<ProtectedRoute><Recap /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
