import { create } from 'zustand';
import {
  getAllNotification,
  createNotification,
  markNotificationAsRead,
  deleteNotification,
  markAllNotificationsAsRead,
} from '../utils/api';
import { toast } from 'react-toastify';
import getErrorMessage from '../utils/error';

const useNotification = create((set, get) => ({
  notifications: [],
  loading: false,

  // GET all notifications
  fetchNotifications: async () => {
    set({ loading: true });
    try {
      const { success, message, notifications } = await getAllNotification();
      if (!success) throw new Error(message);
      set({ notifications });
      return { success, message, notifications };
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, { position: 'top-right' });
      return { success: false, message };
    } finally {
      set({ loading: false });
    }
  },

  // POST create notification
  addNotification: async (newData) => {
    try {
      const { success, message, notification } = await createNotification(newData);
      if (!success) throw new Error(message);
      set((state) => ({
        notifications: [notification, ...state.notifications],
      }));
      toast.success(message, { position: 'top-right' });
      return { success, message, notification };
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, { position: 'top-right' });
      return { success: false, message };
    }
  },

  // PATCH mark as read
  markAsRead: async (id) => {
    try {
      const { success, message } = await markNotificationAsRead(id);
      if (!success) throw new Error(message);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, dibaca: true } : n
        ),
      }));
      return { success, message };
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, { position: 'top-right' });
      return { success: false, message };
    }
  },

  // DELETE notification
  removeNotification: async (id) => {
    try {
      const { success, message } = await deleteNotification(id);
      if (!success) throw new Error(message);
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
      toast.success(message, { position: 'top-right' });
      return { success, message };
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, { position: 'top-right' });
      return { success: false, message };
    }
  },
}));

export default useNotification;
