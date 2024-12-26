import { create} from 'zustand';
import getErrorMessage from '../utils/error';
import { deletePesanan, getAllPesanan} from '../utils/api';

const usePesanan = create((set) => ({
    pesanan: [],
    loading: false,
    fetchPesanan: async () => {
      try {
        set(() => ({ loading: true }));
        const { success, message, pesanan} = await getAllPesanan();
        if (!success) {
          throw new Error(message);
        }
        set(() => ({ pesanan }));
        return { message, success: true };
      } catch (error) {
        const message = getErrorMessage(error);
        return { message, success: false };
      } finally {
        set(() => ({ loading: false }));
      }
    },
    delPesanan: async (id) => {
      set({ loading: true, success: false, error: null });
      try {
        const { success, message } = await deletePesanan(id);
        if (success) {
          set({ success: true, error: null });
          alert('Berhasil menghapus pesanan'); 
        } else {
          set({ success: false, error: message });
          alert(`Gagal: ${message}`);
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        set({ success: false, error: errorMessage });
        alert(`Error: ${errorMessage}`);
      } finally {
        set({ loading: false });
      }
    },
  }));
  
  export default usePesanan;