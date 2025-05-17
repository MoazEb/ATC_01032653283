import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserHomePage from "./pages/UserHomePage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useEffect } from "react";
import useAuthStore from "./stores/useAuthStore";
import Cookies from "js-cookie";
import AdminPanelPage from "./pages/AdminPanelPage";
import { Outlet } from "react-router-dom";
import AdminCreateEventPage from "./pages/AdminCreateEventPage";
import CongratulationPage from "./pages/CongratulationPage";
import ForbiddenPage from "./pages/ForbiddenPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/common/Navbar";
import UserEventDetailsPage from "./pages/UserEventDetailsPage";
import AdminEditEventPage from "./pages/AdminEditEventPage";

function App() {
    const authStore = useAuthStore();

    useEffect(() => {
        const id = Cookies.get("fullId");
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");

        if (!id || !accessToken || !refreshToken) {
            authStore.logout();
        }
    }, []);

    return (
        <div className="font-light font-poppins">
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/congratulation" element={<CongratulationPage />} />
                <Route path="/forbidden" element={<ForbiddenPage />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Outlet />
                        </ProtectedRoute>
                    }
                >
                    {/* user */}
                    <Route path="/" element={<UserHomePage />} />
                    <Route path="event/:eventId" element={<UserEventDetailsPage />} />

                    {/* admin */}
                    <Route path="panel" element={<AdminPanelPage />} />
                    <Route path="panel/:id" element={<AdminEditEventPage />} />
                    <Route path="panel/create" element={<AdminCreateEventPage />} />
                </Route>

                <Route path="/*" element={<NotFoundPage />} />
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;
