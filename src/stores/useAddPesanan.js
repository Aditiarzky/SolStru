import { create } from 'zustand';
import { addPesanan } from '../utils/api';
import getErrorMessage from '../utils/error';

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
        alert(message); // Tampilkan pesan berhasil
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

export default useAddPesanan;
