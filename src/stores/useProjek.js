import { create} from 'zustand';
import getErrorMessage from '../utils/error';
import { addProjek, deleteProjek, editProjek, getAllProjek } from '../utils/api';
import { toast } from 'react-toastify';

const useProjek = create((set) => ({
    projek: [],
    fetchLoading: false,
    delLoading: false,
    loading: false,
    error: null,
    fetchProjek: async () => {
      try {
        set(() => ({ fetchLoading: true }));
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
        set(() => ({ fetchLoading: false }));
      }
    },
    delProjek: async (id) => {
      set({ delLoading: true, success: false, error: null });
      try {
        const { success, message } = await deleteProjek(id);
        if (success) {
          set({ success: true, error: null });
          toast.success('Berhasil menghapus Projek'); 
        } else {
          set({ success: false, error: message });
          toast.error(`Gagal: ${message}`);
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        set({ success: false, error: errorMessage });
        toast.error(`Error: ${errorMessage}`);
      } finally {
        set({ delLoading: false });
      }
    },
    addProjek: async (projekData) => {
      set({ loading: true, success: false, error: null });
      try {
        const { success, message } = await addProjek(projekData);
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
    editProjek: async (editProjekData, pjid) => {
      set({ loading: true, success: false, error: null });
      try {
        const { success, message } = await editProjek(editProjekData, pjid);
        if (success) {
          set({ success: true, error: null });
          toast.success('Berhasil mengubah projek'); 
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
  
  export default useProjek;