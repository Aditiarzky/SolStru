import React, { useState, useEffect } from "react";
import useProjek from "../stores/useProjek";

const ProjectManagement = () => {
  const {
    projek,
    fetchProjek,
    delProjek,
    addProjek,
    editProjek,
  } = useProjek();
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [currentProjek, setCurrentProjek] = useState(null);
  const [form, setForm] = useState({
    foto_pj: "",
    nama_pj: "",
    alamat_pj: "",
    jenis_layanan: "",
    luas_tanah: "",
    luas_bangunana: "",
    kamar_tidur: "",
    kamar_mandi: "",
    kamar_art: "",
    kapasitas_mobil: "",
    lantai: "",
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
      setCurrentProjek(projek);
      setForm(projek);
    } else {
      setCurrentProjek(null);
      setForm({
        nama_pj: "",
        alamat_pj: "",
        jenis_layanan: "",
        luas_tanah: "",
        luas_bangunana: "",
        kamar_tidur: "",
        kamar_mandi: "",
        kamar_art: "",
        kapasitas_mobil: "",
        lantai: "",
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
      await delProjek(id);
      fetchProjek();
    }
  };

  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold mb-4">Manage Proyek</h2>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleOpenModal("add")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Tambah Proyek
        </button>
      </div>
      <ul>
        {projek.map((p) => (
          <li key={p.pjid} className="mb-4 p-4 bg-white shadow rounded-lg">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-bold">{p.nama_pj}</h3>
                <p className="text-sm text-gray-600">{p.deskripsi}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleOpenModal("edit", p)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.pjid)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg overflow-y-scroll h-dvh md:h-[80%] md:w-[80%] w-full ">
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
                <label className="block text-sm font-medium mb-2">Nama Proyek</label>
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
                <label className="block text-sm font-medium mb-2">Upload Foto</label>
                <input
                  type="file"
                  id="foto_file"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Url Foto</label>
                <input
                  type="text"
                  disabled
                  id="foto_pj"
                  value={form.foto_pj}
                  onChange={(e) => setForm({ ...form, foto_pj: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Masukkan Nama Proyek"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Alamat</label>
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
                <label className="block text-sm font-medium mb-2">Deskripsi</label>
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
                <label className="block text-sm font-medium mb-2">Luas Tanah (M²)</label>
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
                <label className="block text-sm font-medium mb-2">Luas Bangunan (M²)</label>
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
                <label className="block text-sm font-medium mb-2">Kamar Tidur</label>
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
                <label className="block text-sm font-medium mb-2">Kamar Mandi</label>
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
                <label className="block text-sm font-medium mb-2">Kamar ART</label>
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
                <label className="block text-sm font-medium mb-2">Kapasitas Mobil</label>
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
                <label className="block text-sm font-medium mb-2">Jumlah Lantai</label>
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
                <label className="block text-sm font-medium mb-2">Fasilitas Pendukung</label>
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
                <label className="block text-sm font-medium mb-2">Gaya Bangunan</label>
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
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="px-4 py-2 bg-[#5f5f5f] text-white rounded-lg hover-bright"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1f1f1f] text-white rounded-lg hover-bright"
                >
                  Simpan
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
