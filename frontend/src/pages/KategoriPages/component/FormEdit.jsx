import { useEffect, useState } from "react";
import Button from "../../../components/ui/button/Button";
import apiClient from "../../../services/Api";
import Swal from "sweetalert2";

export default function FormEdit({ closeModal, dataToEdit, onSucces }) {
  const [formEdit, setFormEdit] = useState({
    ktg_nama: "",
    prodi_id: ""
  });
  const [prodiName, setProdiName] = useState("Memuat...");
  const [loading, setLoading] = useState(false);
  
  // Ambil data user dari localStorage
  const dataUserString = localStorage.getItem("DataUser");
  const userData = dataUserString ? JSON.parse(dataUserString) : null;
  const userProdiId = userData?.prodi_id;

  useEffect(() => {
    setFormEdit({
      ktg_nama: dataToEdit.ktg_nama,
      prodi_id: dataToEdit.prodi_id || ""
    });

    if (userData?.role === "admin") {
      setProdiName(userData.name.toUpperCase());
    } else if (userData?.role === "super_admin") {
      setProdiName("Semua Prodi (Super Admin)");
    } else {
      setProdiName("Prodi tidak diketahui");
    }
  }, [dataToEdit, userData]);

  const handleSubmit = async () => {
    setLoading(true);
    let id = dataToEdit.id;
    try {
      await apiClient.put(`/kategori/${id}`, formEdit);
      console.log("Data berhasil diedit");
      if (onSucces) {
        onSucces();
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Kategori berhasil diedit',
          timer: 1500
        })
      }
    } catch (err) {
      console.log(
        "Error update data",
        err.response ? err.response.data : err.response.message
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <label
            htmlFor="prodi"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Program Studi
          </label>
          <input
            id="prodi"
            value={prodiName}
            readOnly
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-lg p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed"
          />
        </div>
        <div>
          <label
            htmlFor="kategori"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Kategori
          </label>
          <input
            id="kategori"
            value={formEdit.ktg_nama}
            onChange={(e) =>
              setFormEdit({ ...formEdit, ktg_nama: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-2 dark:bg-gray-800 dark:border-gray-600"
            required
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={closeModal}>
            Batal
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </>
  );
}
