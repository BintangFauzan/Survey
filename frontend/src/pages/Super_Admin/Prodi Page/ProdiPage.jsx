import { useEffect, useState } from "react"
import apiClient from "../../../services/Api"
import ComponentCard from "../../../components/common/ComponentCard"
import ProdiTabel from "./component/ProdiTabel"
import { Modal } from "../../../components/ui/modal/ModalDialog"
import Button from "../../../components/ui/button/Button"
import FormTambah from "./component/FormTambah"
import FormEdit from "./component/FormEdit"
import Swal from "sweetalert2"; // <-- Tambahkan impor Swal

export default function ProdiPage() {
    const [dataProdi, setDataProdi] = useState([])
    const [isModalTambahOpen, setIsModalTambahOpen] = useState(false)
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)
    const [refreshData, setRefreshData] = useState(false)
    const [editDataProdiId, setEditProdiId] = useState(null)
    const [loading, setLoading] = useState(false)

    // State baru untuk hapus
    const [isModalHapusOpen, setIsModalHapusOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    async function fetchDataProdi() {
        setLoading(true)
        try{
            const res = await apiClient.get('/prodi')
            const data = res.data.data.data
            setDataProdi(data)
            setRefreshData(false)
        }catch(err){
            console.log("Gagal ambil data prodi", err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDataProdi()
    }, [refreshData])

    function handleSuccesTambahProdi(){
        setRefreshData(true)
        setIsModalTambahOpen(false)
    }
    function handleSuccesEditProdi(){
        setRefreshData(true)
        setIsModalEditOpen(false)
    }

    // --- Logika Hapus ---
    function handleOpenModalHapus(id) {
        setIsModalHapusOpen(true);
        setIdToDelete(id);
    }
    
    function handleCloseModalHapus() {
        setIsModalHapusOpen(false);
        setIdToDelete(null);
    }

    const submitHapusProdi = async () => {
        try {
            await apiClient.delete(`/prodi/${idToDelete}`);
            console.log("Data Prodi berhasil dihapus");
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Prodi berhasil dihapus",
                timer: 1500,
            });
            setRefreshData(true);
            setIsModalHapusOpen(false);
        } catch (err) {
            console.log(
                "Error hapus data prodi",
                err.response ? err.response.data : err.response.message
            );
        }
    };
    // --------------------

    function handleOpenModalEdit(id){
        setIsModalEditOpen(true)
        setEditProdiId(id)
    }

    return(
        <>
        {/* Modal Tambah */}
        <Modal isOpen={isModalTambahOpen} className="max-w-xl p-6">
            <FormTambah
            onSucces={handleSuccesTambahProdi}
            closeModal={() => setIsModalTambahOpen(false)}
            />
        </Modal>
        {/* Modal Edit */}
        <Modal isOpen={isModalEditOpen} className="max-w-xl p-6">
            <FormEdit
            onSucces={handleSuccesEditProdi}
            closeModal={() => setIsModalEditOpen(false)}
            prodiId={editDataProdiId}
            />
        </Modal>
        {/* Modal Hapus */}
        <Modal
            isOpen={isModalHapusOpen}
            className="max-w-xl p-6"
            onClose={handleCloseModalHapus}
        >
            <div className="justify-center items-center p-5 m-5">
                <h2 className="text-center text-lg font-medium">
                    Apa anda yakin ingin menghapus Prodi?
                </h2>
                <div className="items-center flex justify-center space-x-4 mt-4">
                    <Button onClick={submitHapusProdi}>Hapus</Button>
                    <Button onClick={handleCloseModalHapus}>Batal</Button>
                </div >
            </div>
        </Modal>
        <ComponentCard>
            <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* <FilterKategori
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            /> */}
            <Button
              size="sm"
              onClick={() => setIsModalTambahOpen(true)}
              className="flex-shrink-0"
            >
              Tambah
            </Button>
          </div>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <ProdiTabel
            dataProdi={dataProdi}
            loading={loading}
            openModalEdit={handleOpenModalEdit}
            openModalHapus={handleOpenModalHapus}
            />
            </div>
        </ComponentCard>
        </>
    )
}