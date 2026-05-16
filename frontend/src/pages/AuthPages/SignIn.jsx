import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import { Modal as ModalDialog } from "../../components/ui/modal/ModalDialog"
import { useNavigate } from "react-router";
import { useState } from "react";
import apiClient from "../../services/Api";

export default function SignIn() {
  const [formLogin, setFormLogin] = useState({
    email:"",
    password:""
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
   const submitLogin = async (e) => {
    e.preventDefault()

    if(!formLogin.email || !formLogin.password){
      console.log("Tolong masukan email dan password")
      return
    }
    setLoading(true)
    console.log(loading,"Loading.......")
    try{
      const response = await apiClient.post("/login", formLogin)
      const token = response.data.authorisation.token;
      const dataUser = response.data.user;
      const userId = response.data.user.id;
      const role = response.data.user.role

      localStorage.setItem("AuthToken", token);
      localStorage.setItem("UserRole", role)
      localStorage.setItem("DataUser", JSON.stringify(dataUser));
      localStorage.setItem("IdUser", userId);

      if(role === 'super_admin'){
        navigate('/super-admin')
      }
      if(role === 'admin'){
        navigate('/home')
      }
    }catch(err){
      console.log("Gagal login", err)
    }finally{
      setLoading(false)
    }
  }
  return (
    <>
    <ModalDialog isOpen={loading}>Loading........</ModalDialog>
      <PageMeta
        title="Survey App"
      />
      <AuthLayout>
        <SignInForm submitLogin={submitLogin}
        onChangeEmail={(e) => setFormLogin({...formLogin, email: e.target.value})}
        onChangePassword={(e) => setFormLogin({...formLogin, password: e.target.value})}
        />
      </AuthLayout>
    </>
  );
}
