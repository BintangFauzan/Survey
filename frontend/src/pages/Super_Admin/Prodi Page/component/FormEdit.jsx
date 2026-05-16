import { useState, useEffect } from "react";
import apiClient from "../../../../services/Api";
import Button from "../../../../components/ui/button/Button";

export default function FormEdit({ prodiId, onSucces, closeModal }) {
  const [formEditProdi, setFormEditProdi] = useState({
    nama_prodi: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('id edit', prodiId)

  async function submitEditProdi(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    let id = prodiId.id
    try {
      // Asumsi endpoint untuk update data prodi
      await apiClient.put(`/prodi/${id}`, formEditProdi);
      alert("Berhasil update prodi");
      if (onSucces) onSucces();
      closeModal(); // Tutup modal setelah sukses
    } catch (err) {
      setError("Gagal update prodi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

return (
  <form className="space-y-6 mt-5" onSubmit={submitEditProdi}>
    <div className="space-y-2">
      <label
        htmlFor="nama_prodi"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
            Nama Prodi
          </label>
          <input
        type="text"
        id="nama_prodi"
        placeholder="Masukkan nama prodi"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-2 dark:bg-gray-800 dark:border-gray-600"
            required
            value={formEditProdi.nama_prodi}
            onChange={(e) =>
          setFormEditProdi({
            ...formEditProdi,
            nama_prodi: e.target.value,
          })
        }
          />
      {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
    <div className="flex justify-end space-x-3 pt-4">
      <Button type="button" variant="secondary" onClick={closeModal}>
            Batal
          </Button>
          <Button 
        type="submit"
            disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white"
          >
        {loading ? "Memproses..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
)
}
