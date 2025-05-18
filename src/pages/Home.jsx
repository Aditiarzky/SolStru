import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
export default Home;

function Home(){
  return (
    <div className="max-w-7xl w-full py-3 px-2 gap-1 flex flex-col">
      <Navbar/>
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
            <h1 className="md:text-6xl text-4xl text-center">Selamat datang di SolStru</h1>
            <p className="font-playfair text-3xl md:text-5xl text-center italic tracking-tighter md:p-0 p-2 max-w-2xl">Mitra Terpercaya untuk Konstruksi dan Arsitektur Anda</p>
          </div>
        </section>
        <span className="w-full image1 h-64 md:h-80 bg-bottom rounded-3xl bg-cover bg-no-repeat"></span>
        <section className="overflow-x-scroll w-full snap-x">
          <div className="flex gap-1 w-fit md:w-full">
            <article className="flex justify-between p-8 snap-center bg-white w-48 md:w-64 h-44 rounded-3xl flex-col">
              <div className="bg-[#f8f8f8] rounded-full w-fit p-1">
                <div className="list-icon h-9 w-9"></div>
              </div>
              <p className="text-xl font-medium">Misi Kami</p>
            </article>
            <article className="flex justify-between p-8 bg-white w-48 md:w-64 h-44 rounded-3xl flex-col">
              <div className="bg-[#f8f8f8] rounded-full w-fit p-1">
                <div className="check-icon h-9 w-9"></div>
              </div>
              <p className="text-xl">Menghadirkan Karya Berkualitas</p>
            </article>
            <article className="flex justify-between p-8 bg-white w-48 md:w-64 h-44 rounded-3xl flex-col">
              <div className="bg-[#f8f8f8] rounded-full w-fit p-1">
                <div className="check-icon h-9 w-9"></div>
              </div>
              <p className="text-xl">Inovasi dan Teknologi</p>
            </article>
            <article className="flex justify-between p-8 bg-white w-48 md:w-64 h-44 rounded-3xl flex-col">
              <div className="bg-[#f8f8f8] rounded-full w-fit p-1">
                <div className="check-icon h-9 w-9"></div>
              </div>
              <p className="text-xl">Pembangunan Berkelanjutan</p>
            </article>
            <article className="flex justify-between p-8 bg-white w-48 md:w-64 h-44 rounded-3xl flex-col">
              <div className="bg-[#f8f8f8] rounded-full w-fit p-1">
                <div className="check-icon h-9 w-9"></div>
              </div>
              <p className="text-xl">Melayani dengan Integritas</p>
            </article>
          </div>
        </section>
        <section className="md:flex-row flex-col flex w-full gap-1">
          <div className="image2 bg-center rounded-3xl bg-cover w-full md:h-80 h-56"></div>
          <div className="w-full p-11 rounded-3xl h-80 flex flex-col gap-2 bg-[#f8f8f8]">
            <h1 className="text-2xl font-medium">Visi Kami</h1>
            <p className="text-[#5f5f5f]">Menjadi perusahaan konstruksi dan arsitektur terkemuka yang menciptakan karya berkualitas tinggi, inovatif, dan berkelanjutan untuk generasi mendatang.</p>
          </div>
        </section>
      </motion.main>
      <Footer/>
    </div>
  )
}

