import { CustomerDashboard } from "./customer-dashboard"
import { useRequireAuth } from "../../hooks/useRequireAuth";
import ProtectedRoute from "../../components/layouts/ProtectedRoute";
import usePesanan from "../../stores/usePesanan";
import useNotification from "../../stores/useNotification";
import { useEffect } from "react";

export default function Customer() {
  const {fetchNotifications} = useNotification();
  const {fetchPesanan} = usePesanan();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    fetchPesanan();
  }, [fetchPesanan]);

  return (
    <ProtectedRoute>
      <CustomerDashboard />
    </ProtectedRoute>
  )
}