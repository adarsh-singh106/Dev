import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const Navbar = () => {
  const { state } = useAuth();

  return (
    <div className="flex justify-between items-center p-4 fixed top-0 left-0 w-full h-16  px-6 z-50">
      <div>
        <Link to="/" className="flex items-center gap-2">
          <img src="logo.png" alt="logo" className="w-12" />
          <h2 className="text-2xl font-extrabold bg-linear-to-r from-yellow-500 via-pink-500 to-blue-400 bg-clip-text text-transparent">
            blog-X
          </h2>
        </Link>
      </div>
      <div>
        <ul className="flex gap-8 text-[16px] font-medium">
          <li className="hover:underline ">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:underline hover:z-10">
            <Link to="/explore">Explore</Link>
          </li>
          <li className="hover:underline hover:z-10">
            <Link to="/user/blog">My Blog</Link>
          </li>
          <li className="hover:underline hover:z-10">
            <Link to="/user/:uid">Profile</Link>
          </li>
        </ul>
      </div>
      <div className="flex gap-5 items-center ">
        <p className="cursor-pointer text-red-300">SignUp</p>
        <p className="border p-2 text-black font-bold rounded-lg cursor-pointer bg-orange-400">
          Get Started
        </p>
      </div>
    </div>
  );
};

export default Navbar;
