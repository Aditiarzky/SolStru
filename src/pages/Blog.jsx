import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import useProjek from "../stores/useProjek";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default Blog;

function Blog() {
    const { projek, fetchProjek, fetchLoading, error } = useProjek();
    const [filteredProjek, setFilteredProjek] = useState([]);
    const [selectedType, setSelectedType] = useState("konstruksi");
    const [visibleCount, setVisibleCount] = useState(5);   

    useEffect(() => {
      fetchProjek();
    }, [fetchProjek]);

    useEffect(() => {
      if (projek) {
        const filtered = projek.filter(
          (item) => !selectedType || item.jenis_layanan === selectedType
        );
        setFilteredProjek(filtered);
      }
    }, [projek, selectedType]);

    const visibleProjek = filteredProjek.slice(0, visibleCount);
  
    return (
      <div className="max-w-7xl w-full py-3 flex flex-col gap-1 min-h-dvh">
        <Navbar />
        <motion.main
          className="flex flex-col gap-1"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.5 }}
        >
        <section className="flex flex-col items-center">
            <div className="bg-[#f8f8f8] w-[80%] h-6 rounded-t-3xl"></div>
            <div className="bg-white w-full flex items-center justify-center flex-col h-80 rounded-3xl tracking-[-2px] md:tracking-[-4px]">
                <h1 className="md:text-6xl text-4xl text-center">Blog Proyek Kami</h1>
                <p className="font-playfair text-3xl md:text-5xl text-center italic tracking-tighter md:p-0 p-2 max-w-2xl">
                    Daftar proyek yang telah kami kerjakan
                </p>
            </div>
        </section>
        <section className="bg-white justify-between items-center rounded-3xl flex gap-1 p-2">
            <button
                id="kons-btn"
                onClick={() => setSelectedType("konstruksi")}
                className={`md:text-xl hover-text hover-bright text-center w-full border border-[#5f5f5f] rounded-2xl p-1 ${
                    selectedType === "konstruksi" ? "bg-[#e2e2e2]" : "bg-white"
                }`}
            >
                Hasil Konstruksi
            </button>
            <button
                id="arsi-btn"
                onClick={() => setSelectedType("arsitektur")}
                className={`md:text-xl hover-text hover-bright text-center w-full border border-[#5f5f5f] rounded-2xl p-1 ${
                    selectedType === "arsitektur" ? "bg-[#e2e2e2]" : "bg-white"
                }`}
            >
                Desain Arsitektur
            </button>
        </section>
        {error? (<div>Error: {error}</div>):(
        <section className="flex w-full flex-wrap gap-2 md:gap-4 mt-4">
          {fetchLoading
            ? Array(5).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse flex w-full md:h-80 h-56 bg-gray-200 rounded-3xl"
                  >
                    <div className="w-1/2 bg-gray-300"></div>
                    <div className="w-1/2 p-4 flex flex-col gap-2">
                      <div className="h-6 bg-gray-400 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))
            : visibleProjek.length === 0 ? (
                <div className="w-full text-center p-4 text-lg">
                    Tidak ada data
                </div>)
            : visibleProjek.map((item, index) => (
                <div key={index} className="md:flex w-full hover-bright">
                  <div
                    className="image2 bg-center md:rounded-l-3xl md:rounded-r-none rounded-t-3xl bg-cover w-full md:h-80 h-56"
                    style={{ backgroundImage: `url(${item.foto_pj})` }}
                  ></div>
                  <div className="w-full px-8 py-7 justify-between md:rounded-l-none rounded-b-3xl md:rounded-r-3xl h-80 flex flex-col gap-2 bg-[#f8f8f8]">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-medium">{item.nama_pj}</h1>
                        <h2 className="text-xl">{item.alamat_pj}</h2>
                        <p className="text-[#5f5f5f] mt-2">{item.deskripsi}</p>
                    </div>
                    <Link
                        to={`/detail/${item.pjid}`}
                        className="bg-[#1f1f1f] hover-text hover-bright font-medium text-white rounded-xl py-2 px-4 w-fit"
                    >
                        Lihat detail <span className="arrow">&gt;</span>
                    </Link>
                  </div>
                </div>
              ))
            }
            {visibleCount < filteredProjek.length && (
              <button
                onClick={() => setVisibleCount((prev) => prev + 5)}
                className="mt-4 px-4 w-full py-2 bg-[#5f5f5f] text-white rounded-lg"
              >
                Lihat Lebih Banyak
              </button>
            )}
        </section>
        )}
        </motion.main>
        <Footer />
      </div>
    );
  }
  

