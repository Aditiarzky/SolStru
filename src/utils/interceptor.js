import axios from 'axios';
import useAuth from '../stores/useAuth';

const baseUrl = 'http://localhost:3000';

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// Setup interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Cegah infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken } = useAuth.getState();
      const { success } = await refreshToken();

      if (success) {
        return api(originalRequest); // Coba ulang permintaan awal
      }

      // Jika refresh gagal, logout paksa
      const { logout } = useAuth.getState();
      await logout();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
