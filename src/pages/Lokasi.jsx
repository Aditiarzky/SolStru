import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
export default Lokasi;

function Lokasi() {
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
              <h1 className="md:text-6xl text-4xl text-center">Dimana Lokasi Kami?</h1>
              <p className="font-playfair text-3xl md:text-5xl text-center italic tracking-tighter md:p-0 p-2 max-w-2xl">
              Lokasi Kantor Pusat dan Cabang dari Perusahaan Kami
              </p>
          </div>
        </section>
        <span className="w-full image1 h-64 md:h-80 bg-bottom rounded-3xl bg-cover bg-no-repeat"></span>
        <section className="flex flex-col gap-1">
          <div>
            <h1 className="bg-[#f8f8f8] w-full text-center p-2 rounded-3xl text-xl font-medium">Kantor Pusat</h1>
            <p className="bg-white w-full p-5 rounded-3xl text-[#5f5f5f]">
            Jl. Membangun No. 123, Jakarta<br/>📞 +62 812 3456 7890<br/>📧 contact@solstru.com
            </p>
          </div>
          <div>
            <h1 className="bg-[#f8f8f8] w-full text-center p-2 rounded-3xl text-xl font-medium">Kantor Cabang</h1>
            <p className="bg-white w-full p-5 rounded-3xl text-[#5f5f5f]">
              (Bandung)<br/>Jl. Harmoni No. 45, Bandung<br/>📞 +62 813 2345 6780
              <br/><br/>
              (Surabaya)<br/>Jl. Pahlawan No. 67, Surabaya<br/>📞 +62 814 3456 7890
              <br/><br/>
              (Yogyakarta)<br/>Jl. Jogja Baru No. 12, Yogyakarta<br/>📞 +62 815 4567 8901
            </p>
          </div>
          <div>
            <h1 className="bg-[#f8f8f8] w-full text-center p-2 rounded-3xl text-xl font-medium">Jam Operasional</h1>
            <p className="bg-white w-full p-5 rounded-3xl text-[#5f5f5f]">
              Senin - Jumat<br/>8:00 - 17:00 WIB
              <br/><br/>
              Sabtu<br/>8:00 - 13:00
              <br/><br/>
              Minggu<br/>Libur
            </p>
          </div>
        </section>
      </motion.main>
      <Footer />
    </div>
  );
}
  

