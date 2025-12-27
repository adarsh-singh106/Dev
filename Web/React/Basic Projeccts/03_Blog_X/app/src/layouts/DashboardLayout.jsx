import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    // 1. GLOBAL BACKGROUND: Dark canvas for the floating elements
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#3BB19B]/30">
      {/* 2. Top Navigation (Fixed) */}
      <Navbar />

      {/* 3. Side Navigation (Floating Left) */}
      <Sidebar />

      {/* 4. MAIN DASHBOARD AREA (Floating Right) */}
      {/* - ml-[320px]: Pushes it right to sit next to sidebar (30px gap + 256px sidebar + 34px gap)
         - mt-24: Pushes it down below Navbar
         - mr-[30px]: Adds gap on the right side for symmetry
         - min-h-[calc...]: Ensures it fills the screen height similarly to sidebar
      */}
      <main
        className="ml-80 mt-24 mr-7.5 min-h-[calc(100vh-7rem)] 
                   relative z-0 flex flex-col
                   bg-black/40 backdrop-blur-md
                   border border-white/10 shadow-2xl shadow-black/50
                   rounded-3xl overflow-hidden transition-all duration-300"
      >
        {/* Decorative Gradient Blob (Optional: adds a subtle glow behind content) */}
        <div className="absolute top-[-20%] left-[-10%] w-125 h-125 bg-[#3BB19B]/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Scrollable Content Container */}
        {/* We use h-full here so the internal scrollbar is inside the card, not the window */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
          <div className="max-w-6xl mx-auto">
            {/* This is where Feed, Create Blog, etc. will render */}

            
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
