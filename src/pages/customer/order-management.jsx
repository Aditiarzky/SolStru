import { useEffect, useState } from "react";
import { Eye, MoreHorizontal, Clock, CheckCircle, XCircle, List, LayoutGrid } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { formatDate, formatShortDate } from "../../utils/format";
import usePesanan from "../../stores/usePesanan";
import useAddPesanan from "../../stores/useAddPesanan";
import useAuth from "../../stores/useAuth";
import ProtectedRoute from "../../components/layouts/ProtectedRoute";
import { toast } from "react-toastify";

export function OrderManagement() {
  const { pesanan, loading: loadingPesanan, fetchPesanan } = usePesanan();
  const { editPesanan, loading: loadingCancel } = useAddPesanan();
  const { dataUser } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [cancelingId, setCancelingId] = useState(null);

  useEffect(() => {
    fetchPesanan();
  }, [fetchPesanan]);

  const filteredPesanan = dataUser?.id
    ? pesanan.filter((order) => order.uid === dataUser.id)
    : [];

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setOrderDetailsOpen(true);
  };

  const handleCancel = async (id) => {
    setCancelingId(id);
    const pesananToUpdate = filteredPesanan.find((p) => p.psid === id);

    if (!pesananToUpdate) {
      toast.error("Pesanan tidak ditemukan.");
      setCancelingId(null);
      return;
    }

    const updatedPesanan = {
      ...pesananToUpdate,
      status_pesan: "batal",
    };

    try {
      await editPesanan(updatedPesanan, id);
      await fetchPesanan();
      setOrderDetailsOpen(false);
    } catch (error) {
      console.error("Error canceling order:", error);
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kelola Pemesanan</h2>
          <p className="text-muted-foreground">Lihat dan kelola pemesanan Anda.</p>
        </div>

        {loadingPesanan ? (
          <div className="space-y-4">
            {Array(5)
              .fill()
              .map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-lg" />
              ))}
          </div>
        ) : !dataUser?.id ? (
          <p className="text-center text-muted-foreground">Data pengguna tidak tersedia.</p>
        ) : (
          <Tabs defaultValue="semua" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="semua">
                <LayoutGrid className="h-4" />
                <p className="sm:block hidden">Semua</p>
              </TabsTrigger>
              <TabsTrigger value="ditunda">
                <Clock className="h-4" />
                <p className="sm:block hidden">Ditunda</p>
              </TabsTrigger>
              <TabsTrigger value="disetujui">
                <CheckCircle className="h-4" />
                <p className="sm:block hidden">Disetujui</p>
              </TabsTrigger>
              <TabsTrigger value="ditolak">
                <XCircle className="h-4" />
                <p className="sm:block hidden">Ditolak/Batal</p>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="semua" className="space-y-4">
              {filteredPesanan.length === 0 ? (
                <p className="text-center text-muted-foreground">Tidak ada pemesanan.</p>
              ) : (
                filteredPesanan.map((order) => (
                  <OrderCard
                    key={order.psid}
                    order={order}
                    onViewDetails={viewOrderDetails}
                    onCancel={handleCancel}
                    cancelingId={cancelingId}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="ditunda" className="space-y-4">
              {filteredPesanan.filter((o) => o.status_pesan === "ditunda").length === 0 ? (
                <p className="text-center text-muted-foreground">Tidak ada pemesanan ditunda.</p>
              ) : (
                filteredPesanan
                  .filter((o) => o.status_pesan === "ditunda")
                  .map((order) => (
                    <OrderCard
                      key={order.psid}
                      order={order}
                      onViewDetails={viewOrderDetails}
                      onCancel={handleCancel}
                      cancelingId={cancelingId}
                    />
                  ))
              )}
            </TabsContent>

            <TabsContent value="disetujui" className="space-y-4">
              {filteredPesanan.filter((o) => o.status_pesan === "disetujui").length === 0 ? (
                <p className="text-center text-muted-foreground">Tidak ada pemesanan disetujui.</p>
              ) : (
                filteredPesanan
                  .filter((o) => o.status_pesan === "disetujui")
                  .map((order) => (
                    <OrderCard
                      key={order.psid}
                      order={order}
                      onViewDetails={viewOrderDetails}
                      onCancel={handleCancel}
                      cancelingId={cancelingId}
                    />
                  ))
              )}
            </TabsContent>

            <TabsContent value="ditolak" className="space-y-4">
              {filteredPesanan.filter((o) => o.status_pesan === "ditolak" || o.status_pesan === "batal").length === 0 ? (
                <p className="text-center text-muted-foreground">Tidak ada pemesanan ditolak atau batal.</p>
              ) : (
                filteredPesanan
                  .filter((o) => o.status_pesan === "ditolak" || o.status_pesan === "batal")
                  .map((order) => (
                    <OrderCard
                      key={order.psid}
                      order={order}
                      onViewDetails={viewOrderDetails}
                      onCancel={handleCancel}
                      cancelingId={cancelingId}
                    />
                  ))
              )}
            </TabsContent>
          </Tabs>
        )}

        <Dialog open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detail Pemesanan: {selectedOrder?.nama_ps}</DialogTitle>
              <DialogDescription>
                Dibuat pada {selectedOrder?.created_at ? formatShortDate(selectedOrder.created_at) : "-"}
              </DialogDescription>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Informasi Pemesanan</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Nama Pemesanan:</span>
                      <p>{selectedOrder.nama_ps}</p>
                    </div>
                    <div>
                      <span className="font-medium">Jenis Layanan:</span>
                      <p>{selectedOrder.jlayanan_ps}</p>
                    </div>
                    <div>
                      <span className="font-medium">Ukuran:</span>
                      <p>{selectedOrder.ukuran_ps} m²</p>
                    </div>
                    <div>
                      <span className="font-medium">Tanggal Mulai:</span>
                      <p>
                        {selectedOrder.tanggal_mulai ? formatDate(selectedOrder.tanggal_mulai) : "-"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Alamat</h4>
                  <p className="text-sm">{selectedOrder.alamat_ps}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Deskripsi</h4>
                  <p className="text-sm">{selectedOrder.deskripsi_ps || "Tidak ada deskripsi."}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Status</h4>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={selectedOrder.status_pesan} />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Metadata</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">ID Pengguna:</span>
                      <p>{selectedOrder.uid}</p>
                    </div>
                    <div>
                      <span className="font-medium">Nama Pengguna:</span>
                      <p>{dataUser?.name || "Tidak tersedia"}</p>
                    </div>
                    <div>
                      <span className="font-medium">Telepon:</span>
                      <p>{dataUser?.telepon || "Tidak tersedia"}</p>
                    </div>
                    <div>
                      <span className="font-medium">Terakhir Diubah:</span>
                      <p>{selectedOrder.edited_at ? formatShortDate(selectedOrder.edited_at) : "-"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="gap-2 sm:gap-0">
              {selectedOrder?.status_pesan === "ditunda" && (
                <Button
                  variant="destructive"
                  onClick={() => handleCancel(selectedOrder.psid)}
                  disabled={cancelingId === selectedOrder?.psid}
                >
                  {cancelingId === selectedOrder?.psid ? "Membatalkan..." : "Batalkan Pemesanan"}
                </Button>
              )}
              <Button onClick={() => setOrderDetailsOpen(false)}>Tutup</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}

function OrderCard({ order, onViewDetails, onCancel, cancelingId }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">{order.nama_ps}</CardTitle>
            <StatusBadge status={order.status_pesan} />
          </div>
          <span className="text-xs text-muted-foreground">
            {order.created_at ? formatShortDate(order.created_at) : "-"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">{order.jlayanan_ps}</p>
            <p className="text-xs text-muted-foreground">{order.alamat_ps}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onViewDetails(order)}>
              <Eye className="h-4 w-4 mr-1" />
              <p className="md:block hidden">Lihat Detail</p>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Opsi lainnya</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align>
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onViewDetails(order)}>
                  Lihat Detail
                </DropdownMenuItem>
                {order.status_pesan === "ditunda" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={() => onCancel(order.psid)}
                      disabled={cancelingId === order.psid}
                    >
                      Batalkan Pemesanan
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }) {
  let variant = "outline";
  let icon = null;

  switch (status) {
    case "ditunda":
      variant = "outline";
      icon = <Clock className="h-3 w-3 mr-1 text-yellow-500" />;
      break;
    case "disetujui":
      variant = "outline";
      icon = <CheckCircle className="h-3 w-3 mr-1 text-green-500" />;
      break;
    case "ditolak":
    case "batal":
      variant = "destructive";
      icon = <XCircle className="h-3 w-3 mr-1 text-white" />;
      break;
  }

  return (
    <Badge variant={variant} className="flex items-center">
      {icon}
      <p className="md:block hidden">
        {status === "ditunda"
          ? "Ditunda"
          : status === "disetujui"
          ? "Disetujui"
          : status === "ditolak"
          ? "Ditolak"
          : "Batal"}
      </p>
    </Badge>
  );
}

export default OrderManagement;