import { useEffect, useState } from "react";
import InputSelect from "../../../components/form/form-elements/InputSelect";
import Button from "../../../components/ui/button/Button";
import apiClient from "../../../services/Api";

export default function FormTambah({ onSucces, closeModal }) {
  const [formTambahPengguna, setformTambahPengguna] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
    prodi_id: "",
  });
  const [dataProdi, setDataProd] = useState([])

  async function fetchDataProdi() {
    try{
      const res = await apiClient.get('/prodi')
      const data = res.data.data.map((p) => ({
        value: p.id,
        label: p.nama_prodi
      }))
      setDataProd(data)
    }catch(err){
      console.log("Gagal fetch data prodi", err)
    }
  }
  async function handleSubmitPengguna(e) {
    e.preventDefault;
    try {
      await apiClient.post("/register", formTambahPengguna);
      alert("Berhasil tambah pengguna");
      if (onSucces) onSucces();
    } catch (err) {
      alert("Gagal tambah penggunaa",  err.response ? err.response.data : err.response.message);
    }
  }

  console.log(formTambahPengguna)

  function handleOnChange(InputIdentifier, value) {
    setformTambahPengguna((prevState) => {
      return {
        ...prevState,
        [InputIdentifier]: value,
      };
    });
  }


  useEffect(() => {
    fetchDataProdi()
  },[])
  return (
    <>
      <form className="space-y-6 mt-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label
            htmlFor="nama_lengkap"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Nama Lengkap
          </label>
          <input
            type="text"
            id="name"
            placeholder="Masukkan nama lengkap"
            className="mt-5 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-2 dark:bg-gray-800 dark:border-gray-600"
            required
            onChange={(e) => setformTambahPengguna({...formTambahPengguna, name: e.target.value})}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="user@domain.com"
            className="mt-5 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-2 dark:bg-gray-800 dark:border-gray-600"
            onChange={(e) => setformTambahPengguna({...formTambahPengguna, email: e.target.value})}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            password
          </label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => setformTambahPengguna({...formTambahPengguna, password: e.target.value})}
            className="mt-5 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg p-2 dark:bg-gray-800 dark:border-gray-600"
          />
        </div>
        <div>
          <InputSelect
            options={dataProdi}
            value={formTambahPengguna.prodi_id}
            onChange={(e) => {
              handleOnChange("prodi_id", e.target.value);
            }}
            placeholder="Pilih Prodi"
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={closeModal}>
            Batal
          </Button>
          <Button type="submit" onClick={handleSubmitPengguna}>
            Simpan
          </Button>
        </div>
      </form>
    </>
  );
}
