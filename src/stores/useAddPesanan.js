import { create } from 'zustand';
import { addPesanan, editPesanan } from '../utils/api';
import getErrorMessage from '../utils/error';
import { toast } from 'react-toastify';

const useAddPesanan = create((set) => ({
  loading: false,
  success: false,
  error: null,
  addPesanan: async (pesananData) => {
    set({ loading: true, success: false, error: null });
    try {
      const { success, message } = await addPesanan(pesananData);
      if (success) {
        set({ success: true, error: null });
        toast.success('Berhasil mengirim pesanan'); 
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
  editPesanan: async (editPesananData, psid) => {
    set({ loading: true, success: false, error: null });
    try {
      const { success, message } = await editPesanan(editPesananData, psid);
      if (success) {
        set({ success: true, error: null });
        toast.success('Berhasil mengubah status pesanan'); 
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
  
}));

export default useAddPesanan;
