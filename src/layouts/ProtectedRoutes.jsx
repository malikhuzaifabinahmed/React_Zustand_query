import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/querys/useUser";

export const ProtectedRoute = () => {
    const { data, isLoading } = useUser();

    if (!data && !isLoading) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};
