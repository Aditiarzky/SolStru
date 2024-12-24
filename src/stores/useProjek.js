import { create} from 'zustand';
import getErrorMessage from '../utils/error';
import { getAllProjek } from '../utils/api';

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
  }));
  
  export default useProjek;