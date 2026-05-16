import { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal/ModalDialog";
import PertanyaanTabel from "../PertanyaanPages/components/PertanyaanTabel";
import PenggunaTabel from "./component/PenggunaTabel";
import FormTambah from "./component/FormTambah";
import apiClient from "../../services/Api";

export default function ManajementPenggunaPage(){
  const [openModalTambah, setOpenModalTambah] = useState(false)
  const [refreshData, setRefreshData] = useState(false)
  const [dataPengguna, setDataPengguna] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchDataPengguna() {
    try{
      const res = await apiClient.get('/user')
      const data = res.data.data.data
      setDataPengguna(data)
      setRefreshData(false)
    }catch(err){
      console.log("Gagal fetch data pengguna", err)
    }
  }

  useEffect(() => {
    fetchDataPengguna()
  }, [refreshData])

  function handleOnSuccesTambahPengguna(){
    setRefreshData(true)
    setOpenModalTambah(false)
  }
  function handleCloseModalTambahPengguna(){
    setOpenModalTambah(false)
  }
    return(
        <>
        {/* Modal Tambah */}
        <Modal isOpen={openModalTambah} className="max-w-xl p-6">
          <FormTambah
          onSucces={handleOnSuccesTambahPengguna}
          closeModal={handleCloseModalTambahPengguna}
          />
        </Modal>
        <ComponentCard>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          {/* <div className="w-full sm:w-auto">
            <Search onSearch={debounceSearch} />
          </div> */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* <FilterKategori
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            /> */}
            <Button
              size="sm"
              onClick={() => setOpenModalTambah(true)}
              className="flex-shrink-0"
            >
              Tambah
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <PenggunaTabel
            dataPengguna={dataPengguna}
            loading={loading}
            // openModalHapus={openModalHapus}
            // openModalEdit={handleOpenModalEdit}
          />
        </div>

        {/* Pagination Controls */}
        {/* <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Halaman {pagination.currentPage} dari {pagination.lastPage}
          </span>
          <div className="flex gap-2">
            <Button size="sm" onClick={handlePrevPage} disabled={pagination.currentPage <= 1 || loading}>
              Previous
            </Button>
            <Button size="sm" onClick={handleNextPage} disabled={pagination.currentPage >= pagination.lastPage || loading}>
              Next
            </Button>
          </div>
        </div> */}
      </ComponentCard>
        </>
    )
}