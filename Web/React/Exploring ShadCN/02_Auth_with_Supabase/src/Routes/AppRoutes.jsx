import Dashboard from "@/layout/Dashboard";
import LandingPage from "@/layout/LandingPage";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
  return <Routes>
    <Route path="/" element={<LandingPage/>}/>

    {/* Protected Routes  */}
    <Route 
    path="/dashboard"
    element={<Dashboard/>}
    />
    
  </Routes>;
};

export default AppRoutes;
