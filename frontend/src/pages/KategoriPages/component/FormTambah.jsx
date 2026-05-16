import { useState, useEffect } from "react";
import Button from "../../../components/ui/button/Button";
import apiClient from "../../../services/Api";
import Swal from "sweetalert2";

export default function FormTambah({ closeModal, onSucces }) {
  const [loading, setLoading] = useState(false)
  const [prodiName, setProdiName] = useState("Memuat...");
  
  // Ambil data user dari localStorage
  const dataUserString = localStorage.getItem("DataUser");
  const userData = dataUserString ? JSON.parse(dataUserString) : null;
  const userProdiId = userData?.prodi_id;

  const [formTambah, setFormTambah] = useState({
    ktg_nama: "",
    prodi_id: userProdiId || ""
  })

  useEffect(() => {
    if (userData?.role === "admin") {
      // Jika admin, gunakan nama user sebagai nama prodi (berdasarkan data pgsd)
      setProdiName(userData.name.toUpperCase());
    } else if (userData?.role === "super_admin") {
      setProdiName("Semua Prodi (Super Admin)");
    } else {
      setProdiName("Prodi tidak diketahui");
    }
  }, [userData]);

  function handleChange(inputIdentifier, value) {
    setFormTambah((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: value
      }
    })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await apiClient.post("/kategori", formTambah, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`
        },
      })
      console.log("Kategori berhasil ditambah")
      if (onSucces) {
        onSucces();
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Kategori berhasil ditambah',
          timer: 1500
        })
      } //onSucces();
    } catch (err) {
      console.log("Error input kategori", err.response ? err.response.data : err.response.message)
    } finally {
      setLoading(false)
    }
  }
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
            placeholder="Masukkan nama kategori"
            onChange={(e) => handleChange("ktg_nama", e.target.value)}
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
