import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext"; // Adjust path

// Import the separated components
import SignInForm from "../../components/Auth/SignInForm";
import SignUpForm from "../../components/Auth/SignUpForm";
import ForgotPassword from "../../components/Auth/ForgotPassword";
import VerifyEmail from "../../components/Auth/VerifyEmail";

const AuthPage = () => {
  const { state, dispatch } = useAuth();
  const { signState } = state;
  const navigate = useNavigate();
  const location = useLocation();

  // Local state to handle the sub-views (Forgot Password & Verify)
  // Options: 'default', 'forgot', 'verify'
  const [subView, setSubView] = useState("default");

  const isSignUp = signState === "SignUp";

  // Sync URL with Reducer State
  useEffect(() => {
    if (location.pathname === "/login") {
      dispatch({ type: "SWITCH_MODE", payload: "SignIn" });
      setSubView("default"); // Reset subview on route change
    } else if (location.pathname === "/register") {
      dispatch({ type: "SWITCH_MODE", payload: "SignUp" });
      setSubView("default");
    }
  }, [location.pathname, dispatch]);

  const handleToggle = () => {
    // When toggling via the overlay, reset any sub-views
    setSubView("default");
    navigate(isSignUp ? "/login" : "/register");
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-black font-sans text-white">
      <div className="relative overflow-hidden w-3xl max-w-full min-h-120 bg-gray-900 rounded-[20px] shadow-[0_14px_28px_rgba(0,0,0,0.5),0_10px_10px_rgba(0,0,0,0.5)]">
        {/* --- SIGN UP CONTAINER (Right Side Logic) --- */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 flex flex-col justify-center items-center bg-gray-900 transition-all duration-500 ease-in-out
          ${isSignUp ? "translate-x-full opacity-100 z-50" : "opacity-0 z-10"}`}
        >
          {/* Conditionally render Register Form OR Verify Email */}
          {subView === "verify" ? (
            <VerifyEmail onResend={() => alert("Code Resent!")} />
          ) : (
            <SignUpForm onRegisterSuccess={() => setSubView("verify")} />
          )}
        </div>

        {/* --- SIGN IN CONTAINER (Left Side Logic) --- */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 flex flex-col justify-center items-center bg-gray-900 z-20 transition-all duration-500 ease-in-out
          ${isSignUp ? "translate-x-full" : ""}`}
        >
          {/* Conditionally render Login Form OR Forgot Password */}
          {subView === "forgot" ? (
            <ForgotPassword onBack={() => setSubView("default")} />
          ) : (
            <SignInForm onForgotPassword={() => setSubView("forgot")} />
          )}
        </div>

        {/* --- OVERLAY CONTAINER (The Sliding Panel) --- */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-500 ease-in-out z-100 rounded-l-[50px]
          ${
            isSignUp ? "-translate-x-full rounded-l-none rounded-r-[50px]" : ""
          }`}
        >
          <div
            className={`bg-linear-to-r from-[#3BB19B] to-[#20B2AA] text-white relative -left-full h-full w-[200%] transform transition-transform duration-500 ease-in-out
            ${isSignUp ? "translate-x-1/2" : "translate-x-0"}`}
          >
            {/* Left Overlay Panel (Visible during Login) */}
            <div
              className={`absolute top-0 flex flex-col items-center justify-center h-full w-1/2 px-10 text-center transform transition-transform duration-500 ease-in-out
              ${isSignUp ? "translate-x-0" : "-translate-x-[20%]"}`}
            >
              <h1 className="font-bold text-3xl mb-0">Welcome Back!</h1>
              <p className="text-sm font-thin leading-5 tracking-wide my-5 text-gray-100">
                Enter your personal details and start journey with us
              </p>
              <button
                className="bg-transparent border border-white text-white rounded-full text-xs font-bold py-3 px-11 uppercase tracking-wider active:scale-95 focus:outline-none hover:bg-white/20 transition-colors cursor-pointer"
                onClick={handleToggle}
              >
                Sign In
              </button>
            </div>

            {/* Right Overlay Panel (Visible during Register) */}
            <div
              className={`absolute top-0 right-0 flex flex-col items-center justify-center h-full w-1/2 px-10 text-center transform transition-transform duration-500 ease-in-out
              ${isSignUp ? "translate-x-[20%]" : "translate-x-0"}`}
            >
              <h1 className="font-bold text-3xl mb-0">Hello, Friend!</h1>
              <p className="text-sm font-thin leading-5 tracking-wide my-5 text-gray-100">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="bg-transparent border border-white text-white rounded-full text-xs font-bold py-3 px-11 uppercase tracking-wider active:scale-95 focus:outline-none hover:bg-white/20 transition-colors cursor-pointer"
                onClick={handleToggle}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
