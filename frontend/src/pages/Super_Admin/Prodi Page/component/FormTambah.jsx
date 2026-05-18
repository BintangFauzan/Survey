import { useState } from "react";
import apiClient from "../../../../services/Api";
import Button from "../../../../components/ui/button/Button";

export default function FormTambah({ onSucces,closeModal }) {
  const [formTambahProdi, setFormTambahProdi] = useState({
    nama_prodi: "",
  });

  async function submitTambahProdi(e) {
    e.preventDefault;
    try {
      await apiClient.post("/prodi", formTambahProdi);
      alert("Berhasil tambah prodi");
      if (onSucces) onSucces();
    } catch (err) {
      const errorMsg = err.response.data.error
      alert("Gagal tambah prodi", errorMsg);
    }
  }
  return (
    <>
      <form className="space-y-6 mt-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label
            htmlFor="nama_prodi"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Nama Prodi
          </label>
          <input
            type="text"
            id="nama_prodi"
            placeholder="Masukkan prodi"
            className="mt-5 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-2 dark:bg-gray-800 dark:border-gray-600"
            required
            onChange={(e) =>
              setFormTambahProdi({
                ...formTambahProdi,
                nama_prodi: e.target.value,
              })
            }
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={closeModal}>
            Batal
          </Button>
          <Button type="submit" onClick={submitTambahProdi}>
            Simpan
          </Button>
        </div>
      </form>
    </>
  );
}
