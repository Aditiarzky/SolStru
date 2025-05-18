import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useDetailProjek from "../stores/useDetailProjek";
import { Footer } from "../components/Footer";

export default function Detail() {
  const { id } = useParams();
  const { projek, fetchProjek, loading, error } = useDetailProjek();

  useEffect(() => {
    fetchProjek(id);
  }, [id, fetchProjek]);
  if (error) {
    return (
      <div className="flex flex-col min-h-screen px-2 justify-center items-center">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }


  return (
    <div className="max-w-7xl w-full py-3 flex flex-col gap-1 min-h-dvh">
      <Navbar />
      {!loading ? (projek === null ? (
      <main className="animate-pulse ">
        <section className="flex flex-col items-center">
          <div className="bg-[#f8f8f8] w-[80%] h-6 rounded-t-3xl"></div>
          <div className="w-full bg-gray-500 flex items-center justify-center flex-col h-80 md:h-[500px] bg-center bg-cover rounded-3xl tracking-[-2px] md:tracking-[-4px]"></div>
        </section>
        <section>
          <div className="w-full px-8 py-7 rounded-3xl h-80 flex flex-col gap-5 bg-[#f8f8f8]">
            <div className="flex flex-col">
                <h1 className="text-2xl font-medium bg-gray-400 h-6 w-full"></h1>
                <h2 className="text-xl bg-gray-400 h-4 w-full"></h2>
                <p className="text-[#5f5f5f] mt-2 bg-gray-400 h-3 w-full"></p>
            </div>
            <div className="bg-[#1f1f1f] font-medium text-white rounded-xl py-2 px-4">
                Detail Bangunan
            </div>
            <div>
              <div className="h-6 bg-gray-400 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded"></div>
            </div>
          </div>
        </section>
      </main>
      ):(
        <main className="flex gap-1 flex-col">
        <section className="flex flex-col items-center">
          <div className="bg-[#f8f8f8] w-[80%] h-6 rounded-t-3xl"></div>
          <div
          style={{backgroundImage: `url(${projek.foto_pj})`}}
          className="w-full flex items-center justify-center flex-col h-80 md:h-[500px] bg-center bg-cover rounded-3xl tracking-[-2px] md:tracking-[-4px]"></div>
        </section>
        <section>
          <div className="w-full px-8 py-7 rounded-3xl h-fit flex flex-col gap-5 bg-[#f8f8f8]">
            <div className="flex flex-col">
                <h1 className="text-2xl font-medium">{projek.nama_pj}</h1>
                <h2 className="text-xl">{projek.alamat_pj}</h2>
                <p className="text-[#5f5f5f] mt-2">{projek.deskripsi}</p>
            </div>
            <div className="bg-[#1f1f1f] text-center font-medium text-white rounded-xl py-2 px-4">
                Detail Bangunan
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <dt className="text-[#5f5f5f]">Luas Tanah</dt>
                <dd className="break-words overflow-auto">{projek.luas_tanah?projek.luas_tanah:"-"}M²</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#5f5f5f]">Luas Bangunan</dt>
                <dd className="break-words overflow-auto">{projek.luas_bangunana?projek.luas_bangunana:"-"}M²</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#5f5f5f]">Kamar Tidur</dt>
                <dd className="break-words overflow-auto">{projek.kamar_tidur?projek.kamar_tidur:"-"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#5f5f5f]">Kamar Mandi</dt>
                <dd className="break-words overflow-auto">{projek.kamar_mandi?projek.kamar_mandi:"-"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#5f5f5f]">Kamar ART</dt>
                <dd className="break-words overflow-auto">{projek.kamar_art?projek.kamar_art:"-"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#5f5f5f]">Kapasistas Mobil</dt>
                <dd className="break-words overflow-auto">{projek.kapasitas_mobil?projek.kapasitas_mobil:"-"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#5f5f5f]">Lantai</dt>
                <dd className="break-words overflow-auto">{projek.lantai?projek.lantai:"-"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#5f5f5f]">Fasilitas Pendukung</dt>
                <dd className="break-words overflow-auto">{projek.pendukung ? projek.pendukung : "-"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#5f5f5f]">Gaya Bangunan</dt>
                <dd className="break-words overflow-auto">{projek.gaya_bangunan ? projek.gaya_bangunan : "-"}</dd>
              </div>
            </div>
          </div>
        </section>
      </main>
      )):(
        <main className="animate-pulse ">
          <section className="flex flex-col items-center">
            <div className="bg-[#f8f8f8] w-[80%] h-6 rounded-t-3xl"></div>
            <div className="w-full bg-gray-500 flex items-center justify-center flex-col h-80 md:h-[500px] bg-center bg-cover rounded-3xl tracking-[-2px] md:tracking-[-4px]"></div>
          </section>
          <section>
            <div className="w-full px-8 py-7 rounded-3xl h-80 flex flex-col gap-5 bg-[#f8f8f8]">
              <div className="flex flex-col">
                  <h1 className="text-2xl font-medium bg-gray-400 h-6 w-full"></h1>
                  <h2 className="text-xl bg-gray-400 h-4 w-full"></h2>
                  <p className="text-[#5f5f5f] mt-2 bg-gray-400 h-3 w-full"></p>
              </div>
              <div className="bg-[#1f1f1f] text-center font-medium text-white rounded-xl py-2 px-4">
              </div>
              <div>
                <div className="h-3 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
              </div>
            </div>
          </section>
        </main>
      )}
      <Footer />
    </div>
  );
}
