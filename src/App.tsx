import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import AdminPanel from "./pages/AdminPanel";
import DashboardPanel from "./components/DashboardPanel/DashboardPanel";
import SalesPage from "./pages/SalesPage";
import ResumePage from "./pages/ResumePage"
import VerifyEmailPage from "./pages/VerifyEmailPage";
import SelectionPage from "./pages/SelectionPage";
import ProfilePage from "./pages/ProfilePage";
import ResumePDFView from "./components/ResumePage/ResumePDFView";
import { ResumeTable } from "./components/ResumePage/ResumeTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/curriculo" element={<ResumePage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/vaga/:id" element={<ProfilePage />}/>
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<Navigate to="/admin/dashboard/" />} />
            <Route path="dashboard" element={<DashboardPanel />}></Route>
            <Route path="vendas" element={<SalesPage />}></Route>
            <Route path="selecao" element={<SelectionPage />}></Route>
            <Route path="curriculos" element={<ResumeTable/>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;