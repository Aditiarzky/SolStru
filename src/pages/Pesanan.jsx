import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import useAddPesanan from "../stores/useAddPesanan";
export default Pesanan;

function Pesanan() {

    const { addPesanan, loading } = useAddPesanan();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(e.target);
      const data = {
        nama_ps: formData.get("nama_ps"),
        alamat_ps: formData.get("alamat_ps"),
        email: formData.get("email"),
        jlayanan_ps: formData.get("jlayanan_ps"),
        status_pesan: "pending",
      };
    
      if (!data.jlayanan_ps) {
        alert("Pilih layanan yang diinginkan.");
        return;
      }
    
      const confirm = window.confirm(
        "Data ini akan dikirim langsung kepada admin. Apakah Anda ingin melanjutkan?"
      );
    
      if (confirm) {
        await addPesanan(data); 
        form.reset();
      } else {
        alert("Pengiriman dibatalkan."); 
      }
    };


    return (
      <div className="max-w-7xl w-full py-3 flex flex-col gap-1 min-h-dvh">
        <Navbar />
        <motion.main
          className="flex flex-col gap-1"
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
                    Setelah pengajuan, nantinya anda akan dihubungi melalui email untuk mendiskusikan kebutuhan anda.
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
          <section className="md:flex w-full h-fit" id="form">
            <div className="image2 bg-center rounded-3xl bg-cover md:h-auto h-56 w-full"></div>
            <div className="w-full p-11 rounded-3xl h-fit flex flex-col gap-2 bg-[#f8f8f8]">
              <h1 className="text-2xl font-medium">Form Pengajuan</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block" htmlFor="nama_ps">Nama</label>
                  <input
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    type="text"
                    id="nama_ps"
                    name="nama_ps"
                    placeholder="Masukkan nama anda"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block" htmlFor="alamat_ps">Alamat</label>
                  <input
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    type="text"
                    id="alamat_ps"
                    name="alamat_ps"
                    placeholder="Masukkan alamat anda"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block" htmlFor="email">Email</label>
                  <input
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Masukkan Email anda"
                    required
                  />
                  <p className="text-sm mt-1 text-[#5f5f5f]">Nanti anda akan dihubungi melalui email ini</p>
                </div>

                <div className="mb-4">
                  <label className="block" htmlFor="jlayanan_ps">Layanan</label>
                  <select
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    id="jlayanan_ps" name="jlayanan_ps"
                  >
                    <option  value="" disabled selected>Pilih layanan yang anda inginkan</option>
                    <option value="konstruksi">Konstruksi</option>
                    <option value="arsitektur">Arsitektur</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white py-2 rounded-md ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#1f1f1f] hover-bright"
                  }`}
                >
                  {loading ? "Mengirim..." : "Kirim"}
                </button>
              </form>
            </div>
          </section>
        </motion.main>
        <Footer />
      </div>
    );
  }
  

