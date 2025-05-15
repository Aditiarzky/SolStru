import { create } from 'zustand';
import { login, logout, getStatusAuth, getUserAuth, getRefreshToken, register} from '../utils/api';
import { toast } from 'react-toastify';
import getErrorMessage from '../utils/error';
import axios from 'axios'; 


const useAuth = create((set) => ({
  dataUser: null,
  loading: false,
  isAuthenticated: false,
  isTokenRefreshed: false,
  
  login: async (credentials) => {
    const createToast = toast.loading('Login process...');
    try {
      set(() => ({ loading: true }));
      const { success, message, role } = await login(credentials);
      if (!success) throw new Error(message);

      toast.update(createToast, {
        position: 'top-right',
        render: 'Login successfully',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });

      set(() => ({ isAuthenticated: true }));
      return { success, message, role };
    } catch (error) {
      const message = getErrorMessage(error);
      toast.update(createToast, {
        position: 'top-right',
        render: message,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
      return { success: false, message };
    } finally {
      set(() => ({ loading: false }));
    }
  },

  logout: async () => {
    try {
      set(() => ({ loading: true }));
      const { success, message } = await logout();
      if (!success) throw new Error(message);

      toast.success(message, { position: 'top-right' });
      set(() => ({ isAuthenticated: false, dataUser: null }));
      return { message, success };
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, { position: 'top-right' });
      return { success: false, message };
    } finally {
      set(() => ({ loading: false }));
    }
  },

  register: async (registerData) => {
    set({ loading: true, success: false, error: null });
    try {
      const { success, message } = await register(registerData);
      if (success) {
        set({ success: true, error: null });
        toast.success('Berhasil menambahkan projek'); 
      } else {
        set({ success: false, error: message });
        toast.error(`Gagal: ${message}`);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      set({ success: false, error: errorMessage });
      toast.error(`Error: ${errorMessage}`);
    } finally {
      set({ loading: false });
    }
  },

  refreshToken: async () => {
    try {
      set(() => ({ loading: true }));
      const { success, message } = await getRefreshToken();
      if (!success) throw new Error(message);
      set(() => ({ isTokenRefreshed: success, isAuthenticated: success }));
      return { message, success };
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, { position: 'top-right' });
      return { success: false, message };
    } finally {
      set(() => ({ loading: false }));
    }
  },

  checkAuth: async () => {
    try {
      set(() => ({ loading: true }));
      const { success } = await getStatusAuth();
      set(() => ({ isAuthenticated: success }));
      return success; 
    } catch {
      set(() => ({ isAuthenticated: false }));
      return false;
    } finally {
      set(() => ({ loading: false }));
    }
  },
  
  userAuth: async () => {
    try {
      set(() => ({ loading: true }));
      const response = await getUserAuth();
      if (!response.success) throw new Error(response.message);

      set(() => ({ dataUser: response.data }));
      return { success: true, data: response.data };
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, { position: 'top-right' });
      return { success: false, message };
    } finally {
      set(() => ({ loading: false }));
    }
  }
}));

export default useAuth;
