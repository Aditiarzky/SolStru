import React, { useState, useEffect } from "react";
import useProjek from "../stores/useProjek";

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
  const [deletingId, setDeletingId] = useState(null);
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
      await delProjek(id);
      fetchProjek();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("Tidak ada file yang dipilih!");
      return;
    }

    setIsUploading(true); 
    const reader = new FileReader();
    reader.onload = async function (e) {
      const base64Data = e.target.result.split(",")[1];
      const imgurUploadURL = "https://api.imgur.com/3/image";
      const clientID = "6da7fcd6fcd2d5c";

      try {
        const response = await fetch(imgurUploadURL, {
          method: "POST",
          headers: {
            Authorization: `Client-ID ${clientID}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: base64Data,
            type: "base64",
          }),
        });

        const result = await response.json();
        if (result.success) {
          const imageURL = result.data.link;
          setForm({ ...form, foto_pj: imageURL });
          alert("Foto berhasil diunggah!");
        } else {
          console.error("Upload gagal:", result);
          alert("Gagal mengunggah foto. Silakan coba lagi.");
        }
      } catch (error) {
        console.error("Error saat mengunggah ke Imgur:", error);
        alert("Terjadi kesalahan saat mengunggah foto.");
      } finally {
        setIsUploading(false); // Reset status loading
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold mb-4">Manage Proyek</h2>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleOpenModal("add")}
          className="px-4 flex items-center gap-2 py-2 bg-[#1f1f1f] text-white rounded-lg hover-bright"
        >
          Tambah Proyek
          <svg class="ikon-plus" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="white">
            <path d="M12 2v20m10-10H2" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      {fetchLoading ? (
            <div>
            {Array(5).fill(0).map((_, index) =>  (
            <div key={index} className="mb-1">
                <div className="py-5 px-8 animate-pulse bg-white rounded-3xl flex gap-2 flex-col">
                <div className="flex gap-2 flex-col">
                    <span className="bg-gray-300 text-sm w-full h-2"></span>
                    <h1 className="font-medium text-xl bg-gray-400 h-2 w-full"></h1>
                    <p className="bg-gray-300 text-sm w-full h-2"></p>
                    <p className="bg-gray-300 text-sm w-full h-2"></p>
                </div>
                </div>
            </div>
            ))}
            </div>
      )
      : projek.length == 0 ? (<div className="w-full text-center">Tidak ada data</div>)
      :(
      <ul>
        {projek.map((p) => (
          <li key={p.pjid} className="mb-1 px-8 py-5 bg-white rounded-3xl">
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
                  Nama Proyek
                </label>
                <input
                  type="text"
                  value={form.nama_pj}
                  onChange={(e) =>
                    setForm({ ...form, nama_pj: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan Nama Proyek"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Upload Foto
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required={statusFile}
                  accept="image/png, image/jpeg"
                />
                {isUploading && <p className="text-sm text-gray-500">Mengunggah foto...</p>}
              </div>

              <div className="mb-4"><img src={form.foto_pj} alt="" srcset="" /></div>
              { form.foto_pj ? "" : (<div className="mb-4 nogambar w-full h-60"></div>)}

              <div className="mb-4">
                <label className="block text-sm mb-2">Alamat</label>
                <input
                  type="text"
                  value={form.alamat_pj}
                  onChange={(e) =>
                    setForm({ ...form, alamat_pj: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan alamat proyek"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Deskripsi</label>
                <textarea
                  type="text"
                  value={form.deskripsi}
                  onChange={(e) =>
                    setForm({ ...form, deskripsi: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan Deskripsi Proyek"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Layanan</label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  id="jlayanan_ps" name="jlayanan_ps"
                  value={form.jenis_layanan}
                  onChange={(e) => setForm({ ...form, jenis_layanan: e.target.value })}
                  required
                >
                  <option  value="" disabled>Pilih layanan yang anda inginkan</option>
                  <option value="konstruksi">Konstruksi</option>
                  <option value="arsitektur">Arsitektur</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2">Luas Tanah (M²)</label>
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  value={form.luas_tanah}
                  onChange={(e) =>
                    setForm({ ...form, luas_tanah: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan luas tanah"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Luas Bangunan (M²)</label>
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  value={form.luas_bangunana}
                  onChange={(e) =>
                    setForm({ ...form, luas_bangunana: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan luas bangunan"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Kamar Tidur</label>
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  value={form.kamar_tidur}
                  onChange={(e) =>
                    setForm({ ...form, kamar_tidur: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan jumlah kamar tidur"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Kamar Mandi</label>
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  value={form.kamar_mandi}
                  onChange={(e) =>
                    setForm({ ...form, kamar_mandi: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan jumlah kamar mandi"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Kamar ART</label>
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  value={form.kamar_art}
                  onChange={(e) =>
                    setForm({ ...form, kamar_art: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan jumlah kamar ART"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Kapasitas Mobil</label>
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  value={form.kapasitas_mobil}
                  onChange={(e) =>
                    setForm({ ...form, kapasitas_mobil: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Muat berapa mobil"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Jumlah Lantai</label>
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  value={form.lantai}
                  onChange={(e) =>
                    setForm({ ...form, lantai: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan jumlah lantai"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Fasilitas Pendukung</label>
                <input
                  type="text"
                  value={form.pendukung}
                  onChange={(e) =>
                    setForm({ ...form, pendukung: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Kolam renang, dapur, gudang..."
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Gaya Bangunan</label>
                <input
                  type="text"
                  value={form.gaya_bangunan}
                  onChange={(e) =>
                    setForm({ ...form, gaya_bangunan: e.target.value })
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Minimalis, Tradisional..."
                />
              </div>
              <div className="flex flex-col w-full justify-end gap-2">
                <button
                  disabled={loading}
                  type="submit"
                  className={loading 
                    ? "px-4 py-2 bg-gray-400 text-white rounded-lg hover-bright cursor-progress" 
                    : "px-4 py-2 bg-[#1f1f1f] text-white rounded-lg hover-bright"}
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
