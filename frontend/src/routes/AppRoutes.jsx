    import { Routes, Route } from "react-router-dom";

    import Landing from "../pages/landing/Landing";
    import Login from "../pages/auth/Login";
    import Register from "../pages/auth/Register";
    import Verify from "../pages/auth/Verify";
    import Onboarding from "../pages/auth/Onboarding";

    import Dashboard from "../pages/dashboard/Dashboard";
    import News from "../pages/news/News";

    import ProtectedRoute from "./ProtectedRoute";

    function AppRoutes() {
        return (
            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify" element={<Verify />} />

                {/* Protected Routes */}
                <Route
                    path="/wizard"
                    element={
                        <ProtectedRoute>
                            <Onboarding />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/news"
                    element={
                        <ProtectedRoute>
                            <News />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        );
    }

    export default AppRoutes;