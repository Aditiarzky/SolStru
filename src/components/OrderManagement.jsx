import { useEffect, useState } from "react";
import usePesanan from "../stores/usePesanan";
import useAddPesanan from "../stores/useAddPesanan";
import emailjs from "emailjs-com";

const OrderManagement = () => {
    const { pesanan, fetchPesanan, delPesanan, loading } = usePesanan();
    const { editPesanan } = useAddPesanan();
    const [filter, setFilter] = useState("all");
    const [visibleCount, setVisibleCount] = useState(5);    
    
    useEffect(() => {
      fetchPesanan(); 
    }, [fetchPesanan]);

    const sendEmail = (email, nama) => {
    const templateParams = {
      to_email: email,
      message: `Pesanan Anda dengan nama ${nama} telah diterima. Silakan hubungi kami lewat nomor WhatsApp berikut untuk informasi lebih lanjut.`,
    };

    emailjs
      .send("service_mktx4jo", "template_gwmh2ba", templateParams, "v4TdC4liCE2kSi2E_")
      .then(
        (response) => {
          console.log("Email berhasil dikirim:", response.status, response.text);
        },
        (error) => {
          console.error("Gagal mengirim email:", error);
        }
      );
    };

    const handleApprove = async (id) => {
        const pesananToUpdate = pesanan.find((p) => p.psid === id);
        if (!pesananToUpdate) return;

        const updatedPesanan = {
          ...pesananToUpdate,
          status_pesan: "approved",
        };

        await editPesanan(updatedPesanan, id);
        fetchPesanan();

        sendEmail(pesananToUpdate.email, pesananToUpdate.nama_ps);
    };

    const handleDelete = async (id) => {
      if (window.confirm("Apakah Anda yakin ingin menghapus pesanan ini?")) {
        await delPesanan(id);
        fetchPesanan();
      }
    };

    const filteredOrders =
      filter === "all"
        ? pesanan
        : pesanan.filter((p) => p.status_pesan === filter);
    
    const visibleOrders = filteredOrders.slice(0, visibleCount);

  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold mb-4">Manage Pesanan</h2>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 cursor-pointer border rounded-lg"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>
      <ul>
        {loading ? (
            <div>
            {Array(5).fill(0).map((_, index) =>  (
            <li key={index} className="mb-2">
                <div className="p-4 animate-pulse bg-white shadow rounded-lg flex gap-2 flex-col">
                <div className="flex gap-2 flex-col">
                    <span className="bg-gray-300 text-sm w-full h-2"></span>
                    <h1 className="font-medium text-xl bg-gray-400 h-2 w-full"></h1>
                    <p className="bg-gray-300 text-sm w-full h-2"></p>
                    <p className="bg-gray-300 text-sm w-full h-2"></p>
                </div>
                </div>
            </li>
            ))}
            </div>
        ) : (
            <div>
              {visibleOrders.map((p) => (
                <li key={p.psid} className="mb-2">
                  <div className="p-4 bg-white shadow rounded-lg flex md:justify-between md:flex-row gap-2 flex-col md:items-center">
                    <div>
                      <span className="text-[#5f5f5f] text-sm">
                        Status: {p.status_pesan}
                      </span>
                      <h1 className="font-medium text-xl">{p.nama_ps}</h1>
                      <p className="uppercase">Layanan: {p.jlayanan_ps}</p>
                      <details className="cursor-pointer">
                        <summary>Detail</summary>
                        <div className="text-md w-full break-words text-[#5f5f5f]">
                          <p>{p.alamat_ps}</p>
                          <p>{p.email}</p>
                        </div>
                      </details>
                    </div>
                    <div className="space-x-2">
                      {p.status_pesan === "pending" && (
                        <button
                          onClick={() => handleApprove(p.psid)}
                          className="px-4 py-2 text-white bg-[#1f1f1f] rounded-lg hover-bright"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(p.psid)}
                        className="px-4 py-2 text-white bg-[#5f5f5f] hover-bright rounded-lg"
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
              className="mt-4 px-4 w-full py-2 bg-[#5f5f5f] text-white rounded-lg"
            >
              Lihat Lebih Banyak
            </button>
        )}
      </ul>
    </section>
  );
};

export default OrderManagement;
