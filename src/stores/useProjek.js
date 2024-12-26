import { create} from 'zustand';
import getErrorMessage from '../utils/error';
import { addProjek, deleteProjek, editProjek, getAllProjek } from '../utils/api';

const useProjek = create((set) => ({
    projek: [],
    loading: false,
    fetchProjek: async () => {
      try {
        set(() => ({ loading: true }));
        const { success, message, projek } = await getAllProjek();
        if (!success) {
          throw new Error(message);
        }
        set(() => ({ projek }));
        return { message, success: true };
      } catch (error) {
        const message = getErrorMessage(error);
        return { message, success: false };
      } finally {
        set(() => ({ loading: false }));
      }
    },
    delProjek: async (id) => {
      set({ loading: true, success: false, error: null });
      try {
        const { success, message } = await deleteProjek(id);
        if (success) {
          set({ success: true, error: null });
          alert('Berhasil menghapus Projek'); 
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
    addProjek: async (projekData) => {
      set({ loading: true, success: false, error: null });
      try {
        const { success, message } = await addProjek(projekData);
        if (success) {
          set({ success: true, error: null });
          alert('Berhasil menambahkan projek'); 
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
    editProjek: async (editProjekData, pjid) => {
      set({ loading: true, success: false, error: null });
      try {
        const { success, message } = await editProjek(editProjekData, pjid);
        if (success) {
          set({ success: true, error: null });
          alert('Berhasil mengubah projek'); 
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
  
  export default useProjek;