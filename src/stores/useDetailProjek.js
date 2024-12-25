import { create} from 'zustand';
import getErrorMessage from '../utils/error';
import { getDetailProjek } from '../utils/api';

const useDetailProjek = create((set) => ({
    projek: null,
    loading: false,
    fetchProjek: async (id) => {
      try {
        set(() => ({ loading: true }));
        const { success, message, projek } = await getDetailProjek(id);
        if (!success) {
          throw new Error(message);
        }
        set(() => ({ projek }));
        return { message, success: true };
      } catch (error) {
        const message = getErrorMessage(error);
        set(() => ({ error: message }));
        return { message, success: false };
      } finally {
        set(() => ({ loading: false }));
      }
    },
  }));
  
  export default useDetailProjek;