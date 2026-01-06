import LandingPage from "@/layout/LandingPage";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
  return <Routes>
    <Route path="/" element={<LandingPage/>}/>
    
  </Routes>;
};

export default AppRoutes;
