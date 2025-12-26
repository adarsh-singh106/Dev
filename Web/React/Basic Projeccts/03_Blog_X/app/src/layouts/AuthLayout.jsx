import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="bg-black min-h-screen w-full">
      {/* No Navbar here! */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;