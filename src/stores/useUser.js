import { create } from 'zustand';
import { editUser, deleteUser } from '../utils/api';
import { toast } from 'react-toastify';
import getErrorMessage from '../utils/error';

const useUser = create((set) => ({
  loading: false,
  successMessage: '',
  errorMessage: '',

  editUser: async (editedUser, id) => {
    const toastId = toast.loading('Updating user...');
    set({ loading: true, successMessage: '', errorMessage: '' });

    try {
      const result = await editUser(editedUser, id);
      if (!result.success) throw new Error(result.message);

      toast.update(toastId, {
        render: 'User updated successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });

      set({ successMessage: result.message });
      return { success: true };
    } catch (error) {
      const message = getErrorMessage(error);
      toast.update(toastId, {
        render: message,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
      set({ errorMessage: message });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  deleteUser: async (id) => {
    const toastId = toast.loading('Deleting user...');
    set({ loading: true, successMessage: '', errorMessage: '' });

    try {
      const result = await deleteUser(id);
      if (!result.success) throw new Error(result.message);

      toast.update(toastId, {
        render: 'User deleted successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });

      set({ successMessage: result.message });
      return { success: true };
    } catch (error) {
      const message = getErrorMessage(error);
      toast.update(toastId, {
        render: message,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
      set({ errorMessage: message });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },
}));

export default useUser;
