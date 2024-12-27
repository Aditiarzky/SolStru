import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../../stores/useAuth';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { login, loading, isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth(); // Periksa autentikasi saat komponen dimuat
    if (isAuthenticated) {
      navigate('/admin', { replace: true }); // Navigasi jika sudah login
    }
  }, [isAuthenticated, navigate, checkAuth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials); // Panggil fungsi login dari store
  };

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-md rounded-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">Username</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 text-white bg-[#5f5f5f] rounded-lg hover-bright"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
