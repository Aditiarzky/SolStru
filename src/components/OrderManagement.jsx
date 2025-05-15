import { useEffect, useState } from "react";
import usePesanan from "../stores/usePesanan";
import useAddPesanan from "../stores/useAddPesanan";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import ProtectedRoute from "../components/layouts/ProtectedRoute";

const OrderManagement = () => {
  const { pesanan, fetchPesanan, delPesanan, loading } = usePesanan();
  const { editPesanan } = useAddPesanan();
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(5);
  const [approvingId, setApprovingId] = useState(null);

  useEffect(() => {
    fetchPesanan();
  }, [fetchPesanan]);

  const sendEmail = (email, nama) => {
    if (!email) {
      toast.error("Alamat email tidak tersedia untuk pesanan ini.");
      return;
    }

    const templateParams = {
      to_email: email,
      message: `Pesanan Anda dengan nama ${nama} telah disetujui. Silakan hubungi kami lewat nomor WhatsApp berikut untuk informasi lebih lanjut.`,
    };

    emailjs
      .send("service_mktx4jo", "template_gwmh2ba", templateParams, "v4TdC4liCE2kSi2E_")
      .then(
        () => {
          toast.success("Email penerimaan berhasil dikirim!");
        },
        (error) => {
          toast.error("Gagal mengirim email.");
          console.error("Gagal mengirim email:", error);
        }
      );
  };

  const handleApprove = async (id) => {
    setApprovingId(id);
    const pesananToUpdate = pesanan.find((p) => p.psid === id);
    if (!pesananToUpdate) {
      toast.error("Pesanan tidak ditemukan.");
      setApprovingId(null);
      return;
    }

    const updatedPesanan = {
      ...pesananToUpdate,
      status_pesan: "approved",
    };

    try {
      await editPesanan(updatedPesanan, id);
      await fetchPesanan();
      sendEmail(pesananToUpdate.email, pesananToUpdate.nama_ps);
    } catch (error) {
      toast.error("Gagal menyetujui pesanan.");
      console.error("Error approving order:", error);
    } finally {
      setApprovingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pesanan ini?")) {
      try {
        await delPesanan(id);
        await fetchPesanan();
        toast.success("Pesanan berhasil dihapus.");
      } catch (error) {
        toast.error("Gagal menghapus pesanan.");
        console.error("Error deleting order:", error);
      }
    }
  };

  const filteredOrders =
    filter === "all" ? pesanan : pesanan.filter((p) => p.status_pesan === filter);

  const visibleOrders = filteredOrders.slice(0, visibleCount);

  return (
    <ProtectedRoute>
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Kelola Pesanan</h2>
        <div className="mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 cursor-pointer border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f1f1f]"
          >
            <option value="all">Semua</option>
            <option value="pending">Pending</option>
            <option value="approved">Disetujui</option>
          </select>
        </div>
        <ul>
          {loading ? (
            <div>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <li key={index} className="mb-1">
                    <div className="py-5 px-8 animate-pulse bg-white rounded-3xl flex gap-2 flex-col">
                      <div className="flex gap-2 flex-col">
                        <span className="bg-gray-300 h-4 w-1/2 rounded"></span>
                        <h1 className="font-medium bg-gray-400 h-6 w-3/4 rounded"></h1>
                        <p className="bg-gray-300 h-4 w-full rounded"></p>
                        <p className="bg-gray-300 h-4 w-full rounded"></p>
                      </div>
                    </div>
                  </li>
                ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            <p className="text-center text-gray-500">Tidak ada pesanan untuk status ini.</p>
          ) : (
            <div>
              {visibleOrders.map((p) => (
                <li key={p.psid} className="mb-1">
                  <div className="py-5 px-8 bg-white rounded-3xl flex md:justify-between md:flex-row gap-2 flex-col md:items-center shadow-sm">
                    <div>
                      <span className="text-[#5f5f5f] text-sm capitalize">
                        Status: {p.status_pesan}
                      </span>
                      <h1 className="font-medium text-xl">{p.nama_ps}</h1>
                      <p className="uppercase text-sm">Layanan: {p.jlayanan_ps}</p>
                      <details className="cursor-pointer">
                        <summary className="text-sm text-[#5f5f5f]">Detail</summary>
                        <div className="text-sm w-full break-words text-[#5f5f5f] mt-2">
                          <p>Alamat: {p.alamat_ps}</p>
                          <p>Email: {p.email || "Tidak tersedia"}</p>
                          <p>Ukuran: {p.ukuran_ps} unit</p>
                          <p>
                            Tanggal Mulai:{" "}
                            {p.tanggal_mulai
                              ? new Date(p.tanggal_mulai).toLocaleDateString("id-ID", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                })
                              : "-"}
                          </p>
                          <p>Deskripsi: {p.deskripsi_ps || "Tidak ada deskripsi"}</p>
                        </div>
                      </details>
                    </div>
                    <div className="flex space-x-2">
                      {p.status_pesan === "pending" && (
                        <button
                          onClick={() => handleApprove(p.psid)}
                          disabled={approvingId === p.psid}
                          className={`px-4 py-2 text-white bg-[#1f1f1f] rounded-lg hover:bg-[#2f2f2f] transition-colors ${
                            approvingId === p.psid ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          {approvingId === p.psid ? "Menyetujui..." : "Setujui"}
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(p.psid)}
                        className="px-4 py-2 text-white bg-[#5f5f5f] hover:bg-[#4f4f4f] rounded-lg transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          )}
          {visibleCount < filteredOrders.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="mt-4 px-4 w-full py-2 bg-[#1f1f1f] text-white rounded-lg hover:bg-[#2f2f2f] transition-colors"
            >
              Lihat Lebih Banyak
            </button>
          )}
        </ul>
      </section>
    </ProtectedRoute>
  );
};

export default OrderManagement;