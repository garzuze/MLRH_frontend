import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import AdminPanel from "./pages/AdminPanel";
import DashboardPanel from "./components/DashboardPanel/DashboardPanel";
import SalesPage from "./pages/SalesPage";

function App() {
  return (
    <Router basename="/MLRH_frontend">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<Navigate to="/admin/dashboard/" />} />
            <Route path="dashboard" element={<DashboardPanel />}></Route>
            <Route path="vendas" element={<SalesPage />}></Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;