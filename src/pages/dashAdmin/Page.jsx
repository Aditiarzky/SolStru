import { AdminDashboard } from "./admin-dashboard"
import ProtectedRoute from "../../components/layouts/ProtectedRoute";
import usePesanan from "../../stores/usePesanan";
import useNotification from "../../stores/useNotification";
import { useEffect } from "react";
import useProjek from "../../stores/useProjek";

export default function Admin() {
  const {fetchNotifications} = useNotification();
  const {fetchPesanan} = usePesanan();
  const {fetchProjek} = useProjek();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  
  useEffect(() => {
    fetchProjek();
  }, [fetchProjek]);

  useEffect(() => {
    fetchPesanan();
  }, [fetchPesanan]);

  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  )
}