import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/querys/useUser";

export const NotProtectedRoutes = () => {
    const { data, isLoading } = useUser();
    if (data && !isLoading) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};  