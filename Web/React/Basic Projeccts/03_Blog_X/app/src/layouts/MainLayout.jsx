import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Import your Navbar here once
import Footer from '../components/Landing/Footer'; // Optional: Add Footer here too

const MainLayout = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      {/* 1. Navbar is rendered here permanently for all child routes */}
      <Navbar /> 

      {/* 2. The specific page content (Home, Profile, etc.) renders here */}
      <main className="grow">
        <Outlet />
      </main>

      {/* 3. Footer is rendered here permanently */}
      <Footer />
    </div>
  );
};

export default MainLayout;