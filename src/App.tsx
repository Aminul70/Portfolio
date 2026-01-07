import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Portfolio } from './pages/Portfolio';
import { Login } from './pages/amin/Login';
import { Dashboard } from './pages/amin/Dashboard';
import { ErrorAdmin } from './pages/ErrorAdmin';
export function App() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<ErrorAdmin />} />
        <Route path="/amin" element={<Login />} />
        <Route path="/amin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>;
}