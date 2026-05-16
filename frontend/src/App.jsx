import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import PublicSurveyPage from "./pages/PublicSurvey/PublicSurveyPage";
import SurveyPage from "./pages/SurveyPage/SurveyPage";
import AppLayout from "./layout/AppLayout";
import PenilaianPage from "./pages/PenilaianPages/PenilaianPage";
import PertanyaanPage from "./pages/PertanyaanPages/PertanyaanPage";
import KategoriPage from "./pages/KategoriPages/KategoriPage";
import PeriodePages from "./pages/PeriodePage/PeriodePages";
import PrivateRoute from "./Route/PrivateRoute";
import ThankYou from "./pages/OtherPage/ThankYou";
import Super_Admin from "./pages/Super_Admin/Super_Admin";
import ManajementPenggunaPage from "./pages/Super_Admin/ManajemenPenggunaPage";
import ProdiPage from "./pages/Super_Admin/Prodi Page/ProdiPage";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/survey/:slug" element={<PublicSurveyPage/>} />
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/thank-you" element={<ThankYou/>}/>

          {/* Protected Routes - Harus login */}
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/survey" element={<SurveyPage/>}/>
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/penilaian" element={<PenilaianPage/>}/>
              <Route path="/pertanyaan" element={<PertanyaanPage/>}/>
              <Route path="/kategori" element={<KategoriPage/>}/>
              <Route path="/periode" element={<PeriodePages/>}/>
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
              {/* Halaman super admin */}
              <Route path="/super-admin" element={<Super_Admin/>}></Route>
              <Route path="/manajemen-pengguna" element={<ManajementPenggunaPage/>}/>
              <Route path="/manajemen-prodi" element={<ProdiPage/>}/>
            </Route>
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}