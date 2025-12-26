import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const Navbar = () => {
  const { state, dispatch } = useAuth(); // Assuming dispatch is available to logout
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // 1. Scroll Effect: Detects when user scrolls down to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // Add your logout logic here, e.g.:
    // dispatch({ type: 'LOGOUT' });
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out border-b
      ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-white/10 py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* --- LOGO SECTION --- */}
        <Link to="/" className="flex items-center gap-2 group">
          {/* Added a subtle rotation on hover for the logo */}
          <img
            src="logo.png"
            alt="logo"
            className="w-10 h-10 transition-transform duration-300 group-hover:rotate-12"
          />
          <h2 className="text-2xl font-extrabold tracking-tight">
            <span className="bg-linear-to-r from-yellow-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              blog-X
            </span>
          </h2>
        </Link>

        {/* --- NAVIGATION LINKS --- */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/explore">Explore</NavItem>

          {/* Only show these if user is logged in? Or always show? 
              Assuming always show for now based on your code */}
          <NavItem to="/user/blog">My Blog</NavItem>
        </ul>

        {/* --- AUTH BUTTONS --- */}
        <div className="flex items-center gap-4">
          {state?.user ? (
            // --- IF LOGGED IN: Show Profile & Logout ---
            <div className="flex items-center gap-4">
              <Link
                to={`/user/${state.user.uid || "profile"}`}
                className="text-gray-300 hover:text-white transition"
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-pink-500 to-orange-400 p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs text-white">
                    {state.user.name ? state.user.name[0] : "U"}
                  </div>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs text-gray-400 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          ) : (
            // --- IF NOT LOGGED IN: Show Sign Up / Get Started ---
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-full bg-linear-to-r from-orange-500 to-pink-600 text-white text-sm font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Small Helper Component for cleaner links
const NavItem = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="relative py-1 hover:text-white transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-pink-500 after:transition-all after:duration-300 hover:after:w-full"
    >
      {children}
    </Link>
  </li>
);

export default Navbar;
