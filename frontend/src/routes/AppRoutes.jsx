import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/landing/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Verify from "../pages/auth/Verify";
import Onboarding from "../pages/auth/Onboarding";


function AppRoutes() {
    return (

            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/wizard" element={<Onboarding />} />


            </Routes>
        
    );
}

export default AppRoutes;