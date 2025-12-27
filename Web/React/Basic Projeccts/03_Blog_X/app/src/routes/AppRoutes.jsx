import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// Pages
import LandingPage from "../pages/LandingPage/LandingPage"; // Your Hero/Landing page
import AuthPage from "../pages/AuthPage/AuthPage"; // The Login/Signup Component we made
import Sidebar from "../components/Dashboard/Sidebar";
import DashboardLayout from "../layouts/DashboardLayout";
// import Profile from '../pages/Profile';      // Example page
// import Feed from '../pages/Feed';            // Example page

const AppRoutes = () => {
  return (
    <Routes>
      {/* GROUP 1: Public Pages (With Navbar) */}
      {/* Any route inside here automatically gets the Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<Sidebar />} />

        {/* <Route path="/profile" element={<Profile />} /> */}
      </Route>

      {/* GROUP 2: Authentication Pages (No Navbar) */}
      {/* Any route inside here acts as a standalone page */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
      </Route>

      {/* GROUP : DashBoard   */}
      <Route element={<DashboardLayout/>}>
      <Route path="/Home" />
      </Route>

      {/* Catch-all: Redirect 404s to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
