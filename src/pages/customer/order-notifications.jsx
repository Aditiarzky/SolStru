import { useEffect, useState } from "react";
import { CheckCircle, ListCheck, Trash2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import useNotification from '../../stores/useNotification';
import { formatShortDate } from "../../utils/format";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/button";
import Skeleton from "../../components/ui/skeleton";
import ProtectedRoute from "../../components/layouts/ProtectedRoute";
import AlertConfirmation from "../../components/AlertConfirmation";

export function OrderNotifications() {
  const {
    notifications,
    fetchNotifications,
    markAsRead,
    removeNotification,
    loading,
  } = useNotification();
  const [markingAll, setMarkingAll] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); 
  const [displayCount, setDisplayCount] = useState(10); // State untuk jumlah notifikasi yang ditampilkan

  // Panggil fetchNotifications saat komponen dimuat
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleCardClick = (id, dibaca) => {
    if (!dibaca) {
      markAsRead(id);
    }
  };

  const handleDeleteAll = async () => {
    setDeletingAll(true);
    try {
      const { success } = await removeNotification(0);
      if (success) {
        await fetchNotifications();
        toast.success("Semua notifikasi berhasil dihapus");
      } else {
        toast.error("Gagal menghapus semua notifikasi");
      }
    } catch (error) {
      console.error("Error deleting all notifications:", error);
      toast.error("Terjadi kesalahan saat menghapus notifikasi");
    }
    setDeletingAll(false);
    setIsDeleteDialogOpen(false);
  };

  const handleMarkAllRead = async () => {
    setMarkingAll(true);
    const { success } = await markAsRead(0);
    if (success) {
      await fetchNotifications();
    }
    toast.success("Semua notifikasi ditandai sebagai dibaca");
    setMarkingAll(false);
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 10); // Tambah 10 notifikasi lagi
  };

  // Ambil notifikasi yang akan ditampilkan (maksimal displayCount)
  const displayedNotifications = notifications.slice(0, displayCount);

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Notifikasi</h2>
            <p className="text-muted-foreground">Tetap terupdate mengenai status pesanan Anda.</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleMarkAllRead}
              className="text-sm text-blue-600 hover:underline"
              disabled={markingAll || loading}
            >
              <ListCheck className="h-4 w-4 mr-1" />
              <p className="md:block hidden">{markingAll ? "Menandai..." : "Tandai Semua sebagai Dibaca"}</p>
            </Button>
            <AlertConfirmation
              title="Konfirmasi Hapus Semua Notifikasi"
              message="Apakah Anda yakin ingin menghapus semua notifikasi? Tindakan ini tidak dapat dibatalkan."
              confirmText="Hapus"
              cancelText="Batal"
              onConfirm={handleDeleteAll}
              triggerButtonText={
                <>
                  <Trash2 className="h-4 w-4 mr-1" />
                  <p className="md:block hidden">{deletingAll ? "Menghapus..." : "Hapus Semua Notifikasi"}</p>
                </>
              }
              triggerButtonVariant="outline"
              isOpen={isDeleteDialogOpen}
              setIsOpen={setIsDeleteDialogOpen}
              className="text-sm text-red-600 hover:underline"
              disabled={deletingAll || loading}
            />
          </div>
        </div>

        {loading ? (
          Array(4)
            .fill()
            .map((_, i) => <Skeleton height="6rem" key={i} />)
        ) : notifications.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-lg">Tidak ada data notifikasi</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedNotifications.map((notification) => (
              <Card
                key={`notification-${notification.id}`}
                className={cn(
                  "cursor-pointer transition-colors duration-150",
                  !notification.dibaca && "border-l-4 border-l-primary bg-muted/50"
                )}
                onClick={() => handleCardClick(notification.id, notification.dibaca)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {notification.status_ntf === "disetujui" && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {notification.status_ntf === "ditolak" && (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <CardTitle className="text-base">{notification.judul}</CardTitle>
                      {!notification.dibaca && <Badge variant="outline">New</Badge>}
                    </div>
                    <span className="text-xs ml-1 text-muted-foreground">
                      {formatShortDate(notification.created_at)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{notification.pesan}</p>
                </CardContent>
              </Card>
            ))}
            {notifications.length > displayCount && (
              <div className="text-center mt-6">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  className="text-blue-600 hover:bg-blue-50"
                >
                  Lebih Banyak
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}