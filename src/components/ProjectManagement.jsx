import React, { useState, useEffect } from "react";
import useProjek from "../stores/useProjek";
import { Progress } from "./ui/progress"; // Impor komponen Progress dari Shadcn
import { Plus, Search } from "lucide-react";
import { toast } from "react-toastify";
import Skeleton from "./ui/skeleton";

const ProjectManagement = () => {
  const {
    projek,
    fetchProjek,
    delProjek,
    addProjek,
    editProjek,
    fetchLoading,
    loading,
  } = useProjek();
  const [modal, setModal] = useState(null);
  const [statusFile, setStatusFile] = useState(null);
  const [currentProjek, setCurrentProjek] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk pencarian
  const [form, setForm] = useState({
    foto_pj: "",
    nama_pj: "",
    alamat_pj: "",
    jenis_layanan: "",
    luas_tanah: null,
    luas_bangunana: null,
    kamar_tidur: null,
    kamar_mandi: null,
    kamar_art: null,
    kapasitas_mobil: null,
    lantai: null,
    pendukung: "",
    gaya_bangunan: "",
    deskripsi: "",
  });

  useEffect(() => {
    fetchProjek();
  }, [fetchProjek]);

  // Urutkan proyek berdasarkan created_at (terbaru ke terlama)
  const sortedProjek = [...projek].sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
    const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
    return dateB - dateA; // Urutan menurun
  });

  // Filter proyek berdasarkan searchQuery
  const filteredProjek = sortedProjek.filter((p) =>
    p.nama_pj.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (type, projek = null) => {
    setModal(type);
    if (type === "edit" && projek) {
      setStatusFile(false);
      setCurrentProjek(projek);
      setForm(projek);
    } else {
      setCurrentProjek(null);
      setStatusFile(true);
      setForm({
        foto_pj: "",
        nama_pj: "",
        alamat_pj: "",
        jenis_layanan: "",
        luas_tanah: null,
        luas_bangunana: null,
        kamar_tidur: null,
        kamar_mandi: null,
        kamar_art: null,
        kapasitas_mobil: null,
        lantai: null,
        pendukung: "",
        gaya_bangunan: "",
        deskripsi: "",
      });
    }
  };

  const handleSubmit = async () => {
    if (modal === "add") {
      await addProjek(form);
    } else if (modal === "edit") {
      await editProjek(form, currentProjek.pjid);
    }
    fetchProjek();
    setModal(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
      setDeletingId(id);
      try {
        await delProjek(id);
      } catch (error) {
        toast.error("Gagal menghapus proyek!");
      }
      fetchProjek();
      setDeletingId(null);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.warning("Tidak ada file yang dipilih!");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulasi progres upload
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          return prev;
        }
        return prev + 10;
      });
    }, 300);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "msa_image"); // Pastikan upload_preset valid
    formData.append("cloud_name", "dwswkz2sk"); // Ganti dengan cloud_name Anda

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dwswkz2sk/image/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result.secure_url) {
        setForm({ ...form, foto_pj: result.secure_url });
      } else {
        throw new Error("Tidak ada secure_url dalam respons Cloudinary");
      }
    } catch (error) {
      console.error("Error saat mengunggah ke Cloudinary:", error);
      clearInterval(progressInterval);
      setUploadProgress(0);
      toast.error(`Gagal mengunggah foto: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold mb-4">Kelola Proyek</h2>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-md"
            placeholder="Cari proyek berdasarkan nama..."
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={() => handleOpenModal("add")}
          className="px-4 flex items-center gap-2 py-2 bg-[#1f1f1f] text-white rounded-lg hover-bright"
        >
          Tambah Proyek
          <Plus />
        </button>
      </div>
      {fetchLoading ? (
        Array(4)
          .fill()
          .map((_, i) => <Skeleton height="6rem" className="mb-5" key={i} />)
      ) : filteredProjek.length === 0 ? (
        <div className="w-full text-center">Tidak ada proyek yang cocok</div>
      ) : (
        <ul className="flex flex-col gap-5">
          {filteredProjek.map((p) => (
            <li key={p.pjid} className="mb-1 px-8 py-5 border bg-white drop-shadow-md rounded-xl">
              <div className="flex flex-col md:flex-row gap-3 md:justify-between md:items-center">
                <div>
                  <h1 className="text-xl font-medium">{p.nama_pj}</h1>
                  <h3 className="text-lg">{p.alamat_pj}</h3>
                  <p className="text-sm text-gray-600">{p.deskripsi}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleOpenModal("edit", p)}
                    className="px-4 py-2 bg-[#1f1f1f] text-white rounded-lg hover-bright"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.pjid)}
                    className="px-4 py-2 bg-[#5f5f5f] text-white rounded-lg hover-bright"
                    disabled={deletingId === p.pjid}
                  >
                    {deletingId === p.pjid ? "Menghapus..." : "Hapus"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg overflow-y-scroll h-dvh md:h-[80%] md:w-[80%] w-full">
            <h3 className="text-lg font-bold mb-4">
              {modal === "add" ? "Tambah Proyek" : "Edit Proyek"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Nama Proyek <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.nama_pj}
                  onChange={(e) => setForm({ ...form, nama_pj: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan Nama Proyek"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Upload Foto <span className="text-red-500">*</span></label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required={statusFile}
                  accept="image/png, image/jpeg"
                  disabled={isUploading}
                />
                {isUploading && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">Mengunggah foto...</p>
                    <Progress value={uploadProgress} className="h-2 w-full" />
                  </div>
                )}
              </div>

              <div className="mb-4">
                {form.foto_pj ? (
                  <img src={form.foto_pj} alt="Preview" className="h-60 object-cover rounded-md" />
                ) : (
                  <div className="mb-4 nogambar h-60 bg-gray-200 rounded-md"></div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">
                  Alamat <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.alamat_pj}
                  onChange={(e) => setForm({ ...form, alamat_pj: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan alamat proyek"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Deskripsi <span className="text-red-500">*</span></label>
                <textarea
                  value={form.deskripsi}
                  onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan Deskripsi Proyek"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">
                  Layanan <span className="text-red-500">*</span>
                </label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  id="jlayanan_ps"
                  name="jlayanan_ps"
                  value={form.jenis_layanan}
                  onChange={(e) => setForm({ ...form, jenis_layanan: e.target.value })}
                  required
                >
                  <option value="" disabled>Pilih layanan yang anda inginkan</option>
                  <option value="konstruksi">Konstruksi</option>
                  <option value="arsitektur">Arsitektur</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Luas Tanah (M²) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  value={form.luas_tanah || ""}
                  onChange={(e) => setForm({ ...form, luas_tanah: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan luas tanah"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Luas Bangunan (M²) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  value={form.luas_bangunana || ""}
                  onChange={(e) => setForm({ ...form, luas_bangunana: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan luas bangunan"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Kamar Tidur</label>
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  value={form.kamar_tidur || ""}
                  onChange={(e) => setForm({ ...form, kamar_tidur: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan jumlah kamar tidur"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Kamar Mandi</label>
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  value={form.kamar_mandi || ""}
                  onChange={(e) => setForm({ ...form, kamar_mandi: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan jumlah kamar mandi"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Kamar ART</label>
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  value={form.kamar_art || ""}
                  onChange={(e) => setForm({ ...form, kamar_art: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan jumlah kamar ART"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Kapasitas Mobil</label>
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  value={form.kapasitas_mobil || ""}
                  onChange={(e) => setForm({ ...form, kapasitas_mobil: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Muat berapa mobil"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Jumlah Lantai</label>
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  value={form.lantai || ""}
                  onChange={(e) => setForm({ ...form, lantai: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan jumlah lantai"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Fasilitas Pendukung</label>
                <input
                  type="text"
                  value={form.pendukung}
                  onChange={(e) => setForm({ ...form, pendukung: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Kolam renang, dapur, gudang..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Gaya Bangunan</label>
                <input
                  type="text"
                  value={form.gaya_bangunan}
                  onChange={(e) => setForm({ ...form, gaya_bangunan: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Minimalis, Tradisional..."
                />
              </div>

              <div className="flex flex-col w-full justify-end gap-2">
                <button
                  disabled={loading || isUploading}
                  type="submit"
                  className={
                    loading || isUploading
                      ? "px-4 py-2 bg-gray-400 text-white rounded-lg hover-bright cursor-progress"
                      : "px-4 py-2 bg-[#1f1f1f] text-white rounded-lg hover-bright"
                  }
                >
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="px-4 py-2 bg-[#5f5f5f] text-white rounded-lg hover-bright"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectManagement;