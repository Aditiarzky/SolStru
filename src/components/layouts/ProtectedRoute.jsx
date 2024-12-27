import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../stores/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth(); // Periksa autentikasi saat komponen dimuat
  }, [checkAuth]);

  if (!isAuthenticated) {
    return <Navigate to="/login-admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
