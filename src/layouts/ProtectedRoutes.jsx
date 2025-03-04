import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/stores/useAuth";

export const ProtectedRoute = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
