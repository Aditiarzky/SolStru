import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FORMORDER_PAGE } from "../routes/routeConstant";

export default function Pesanan() {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate(FORMORDER_PAGE);
  };

  return (
    <div className="max-w-7xl w-full py-3 px-3 flex flex-col gap-3 min-h-dvh">
      <Navbar />
              <motion.main
          className="flex flex-col md:gap-3 gap-2"
          initial={{ opacity: 0 }} // Opacity awal
          animate={{ opacity: 1 }} // Opacity saat animasi
          exit={{ opacity: 0 }} // Opacity saat keluar
          transition={{ duration: 0.5 }} // Durasi animasi
        >
          <section className="flex flex-col items-center">
            <div className="bg-[#f8f8f8] w-[80%] h-6 rounded-t-3xl"></div>
            <div className="bg-white w-full flex items-center justify-center flex-col h-80 rounded-3xl tracking-[-2px] md:tracking-[-4px]">
                <h1 className="md:text-6xl text-4xl text-center">Siap Memulai Proyek Anda?</h1>
                <p className="font-playfair text-3xl md:text-5xl text-center italic tracking-tighter md:p-0 p-2 max-w-2xl">
                Cara Memesan Layanan SolStru
                </p>
            </div>
          </section>
          <span className="w-full image1 h-64 md:h-80 bg-bottom rounded-3xl bg-cover bg-no-repeat"></span>
          <section className="flex flex-col gap-1">
              <h1 className="bg-[#f8f8f8] w-full text-center p-2 rounded-3xl text-xl font-medium">Alur Pemesanan</h1>
              <div className="bg-white w-full py-8 px-12 flex flex-col gap-4 rounded-3xl">
                <div>
                  <ul className="text-xl list-disc font-medium">
                    <li>Pengajuan Pemesanan</li>
                  </ul>
                  <p className="text-[#5f5f5f]">
                    Ajukan pemesanan anda melalui form pengajuan dibawah ini. Nanti pengajuan tersebut akan dicek dan disetujui oleh admin.
                  </p>
                </div>
                <div>
                  <ul className="text-xl list-disc font-medium">
                    <li>Konsultasi Awal</li>
                  </ul>
                  <p className="text-[#5f5f5f]">
                    Setelah pengajuan, nantinya anda akan dihubungi melalui nomor telepon untuk mendiskusikan kebutuhan anda.
                  </p>
                </div>
                <div>
                  <ul className="text-xl list-disc font-medium">
                    <li>Survey Lokasi</li>
                  </ul>
                  <p className="text-[#5f5f5f]">
                  Tim kami akan mengunjungi lokasi Anda untuk memahami kondisi dan potensi proyek.
                  </p>
                </div>
                <div>
                  <ul className="text-xl list-disc font-medium">
                    <li>Proposal & Penawaran</li>
                  </ul>
                  <p className="text-[#5f5f5f]">
                  Kami akan mengirimkan proposal desain dan estimasi biaya yang sesuai dengan kebutuhan Anda.
                  </p>
                </div>
                <div>
                  <ul className="text-xl list-disc font-medium">
                    <li>Kontrak Kerja</li>
                  </ul>
                  <p className="text-[#5f5f5f]">
                  Setelah menyetujui penawaran, kontrak kerja akan ditandatangani untuk memulai proyek.
                  </p>
                </div>
                <div>
                  <ul className="text-xl list-disc font-medium">
                    <li>Eksekusi Proyek</li>
                  </ul>
                  <p className="text-[#5f5f5f]">
                  Proyek akan dilaksanakan sesuai jadwal yang disepakati dengan pengawasan ketat dari tim profesional kami.
                  </p>
                </div>
              </div>
          </section>
        <section className="md:flex w-full gap-1 h-fit" id="form">
          <div className="image2 bg-center rounded-3xl bg-cover md:h-auto h-56 w-full"></div>
          <div className="w-full p-11 rounded-3xl h-fit flex flex-col gap-2 bg-[#f8f8f8]">
            <h1 className="text-2xl font-medium">Buat Pesanan Anda</h1>
            <p className="text-gray-600 mb-4">Klik tombol di bawah untuk memulai pengajuan proyek Anda.</p>
            <button
              onClick={handleOrderClick}
              className="w-full bg-[#1f1f1f] text-white py-2 rounded-md hover-bright"
            >
              Mulai Pemesanan
            </button>
          </div>
        </section>
      </motion.main>
      <Footer />
    </div>
  );
}
