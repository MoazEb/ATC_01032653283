import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

// if user tried to visit admin url it will be redirected to the forbidden page
// and if admin tried to visit user url it will be redirected to the admin panel page
// if is not authenticated it will be redirected to login

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, role } = useAuthStore();
    const { pathname } = useLocation();

    if (!isAuthenticated || !role) {
        return <Navigate to="/login" replace />;
    }

    // for prevent user from visiting admin paths
    else if (pathname.includes("panel") && role === "user") {
        return <Navigate to="/forbidden" replace />;
    }

    // for prevent admin from visiting user paths
    else if (!pathname.includes("panel") && role === "admin") {
        return <Navigate to="/panel" replace />;
    }

    // console.log(children);
    return children;
};

export default ProtectedRoute;
