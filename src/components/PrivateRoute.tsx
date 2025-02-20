import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  // TODO: Create spinning Throbber animation here
  if (loading) {
    return <div>Carregando...</div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;