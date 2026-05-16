import Button from "../../../components/ui/button/Button";
import DatePicker from "../../../components/form/date-picker";
import InputSelect from "../../../components/form/form-elements/InputSelect";
import { useState, useEffect } from "react";
import apiClient from "../../../services/Api";
import Swal from "sweetalert2";

export default function FormTambah({
  dataKategori,
  onSucces,
  closeModalTambah,
}) {
  // Ambil data user dari localStorage
  const dataUserString = localStorage.getItem("DataUser");
  const userData = dataUserString ? JSON.parse(dataUserString) : null;
  const userProdiId = userData?.prodi_id;

  const [form, setForm] = useState({
    ktg_id: "",
    prodi_id: userProdiId || "",
    prd_tgl_mulai: "",
    prd_tgl_selesai: "",
    prd_status: "",
  });
  const [prodiName, setProdiName] = useState("Memuat...");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (userData?.role === "admin") {
      setProdiName(userData.name.toUpperCase());
    } else if (userData?.role === "super_admin") {
      setProdiName("Semua Prodi (Super Admin)");
    } else {
      setProdiName("Prodi tidak diketahui");
    }
  }, [userData]);

  function handleChange(InputIdentifier, value) {
    setForm((prevState) => {
      return {
        ...prevState,
        [InputIdentifier]: value,
      };
    });
  }

  // Fungsi helper untuk memformat objek Date menjadi YYYY-MM-DD
  function formatDate(date) {
    if (!date) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await apiClient.post("/periode", form);
      console.log("Periode berhasil ditambahkan");
      if (onSucces) {
        onSucces();
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Periode berhasil ditambahkan',
          timer: 1500
        });
      }
    } catch (err) {
      console.log("Error kirim data", err);
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
            htmlFor="period"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Kategori
          </label>
          <InputSelect
            placeholder="Pilih Kategori"
            options={dataKategori.map((opt) => ({
              ...opt,
              value: opt.value,
            }))}
            value={form.ktg_id}
            onChange={(e) => {
              handleChange("ktg_id", e.target.value);
            }}
          />
        </div>
        <DatePicker
          id="periode_mulai"
          label="Periode Mulai"
          placeholder="Pilih tanggal mulai"
          onChange={(selectedDates) => {
            handleChange("prd_tgl_mulai", formatDate(selectedDates[0]));
          }}
        />
        <DatePicker
          id="periode_selesai"
          label="Periode Selesai"
          placeholder="Pilih tanggal selesai"
          onChange={(selectedDates) => {
            handleChange("prd_tgl_selesai", formatDate(selectedDates[0]));
          }}
        />
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>
          <InputSelect
            placeholder="Pilih Status"
            options={[
              { value: "status-1", label: "Aktif" },
              { value: "status-0", label: "Tidak Aktif" },
            ]}
            value={form.prd_status !== "" ? `status-${form.prd_status}` : ""}
            onChange={(e) => {
              handleChange("prd_status", e.target.value.replace("status-", ""));
            }}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={closeModalTambah}>
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
<style jsx>{`
  :global(.mx-auto:disabled),
  :global(.mx-auto[disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }
`}</style>