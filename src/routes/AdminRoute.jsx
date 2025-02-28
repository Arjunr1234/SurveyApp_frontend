import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/admin/Login';
import Home from '../pages/admin/Home';
import ProtectedRoute from '../utils/ProtectedRoute';

function AdminRoute() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default AdminRoute;
