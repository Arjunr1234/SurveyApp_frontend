import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


const ProtectedRoute = ({ role }) => {
  const { isUserLoggedIn, isAdminLoggedIn } = useAuth();

  
  if (role === "admin" && !isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  if (role === "user" && !isUserLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
