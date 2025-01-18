import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/stores/useAuth";

export const NotProtectedOnlyRoutes = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
