import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardHome from './pages/DashboardHome';
import Users from './pages/Users';
import Workers from './pages/Workers';
import Schemes from './pages/Schemes';
import EmergencyContacts from './pages/EmergencyContacts';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route path="/" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<Users />} />
          <Route path="workers" element={<Workers />} />
          <Route path="schemes" element={<Schemes />} />
          <Route path="emergency" element={<EmergencyContacts />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
