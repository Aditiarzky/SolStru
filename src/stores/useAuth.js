import { create } from 'zustand';
import { login, getAuthToken, removeAuthToken } from '../utils/api';

const useAuth = create((set) => ({
  token: null,
  isAuthenticated: false,
  loading: false,
  success: false,
  error: null,

  // Login action
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const { success, token, message } = await login(credentials);
      if (success) {
        set({ token, isAuthenticated: true, success, error: null });
        alert('Login berhasil');
      } else {
        set({ token: null, isAuthenticated: false, error: message });
        alert(`Login gagal: ${message}`);
      }
    } catch (error) {
      set({ token: null, isAuthenticated: false, error: error.message });
      alert(`Error: ${error.message}`);
    } finally {
      set({ loading: false });
    }
  },

  // Logout action
  logout: () => {
    removeAuthToken(); // Hapus token dari cookie
    set({ token: null, isAuthenticated: false, error: null });
  },

  // Check authentication
  checkAuth: () => {
    const token = getAuthToken(); // Ambil token dari cookie
    if (token) {
      set({ token, isAuthenticated: true });
    } else {
      set({ token: null, isAuthenticated: false });
    }
  },
}));

export default useAuth;
