import { Routes, Route, Navigate } from "react-router-dom"; // Added Navigate for safety
import Home from "../components/Home";
import Sign from "../components/Sign";
import Dashboard from "../components/Dashboard";
import Verify from "../components/Verify";
import PrivateRoute from "../components/PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. Public Landing Page */}
      <Route path="/" element={<Home />} />

      {/* 2. Authentication Routes (Both point to Sign) */}
      <Route path="/login" element={<Sign />} />
      <Route path="/register" element={<Sign />} />

      {/* ✅ FIXED: Added the slash before :token */}
      <Route path="/verify/:token" element={<Verify />} />
      {/* Optional: Redirect random paths to home or login */}
      <Route path="*" element={<Navigate to="/" />} />

      {/* 👇 PROTECT THE DASHBOARD 👇 */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
