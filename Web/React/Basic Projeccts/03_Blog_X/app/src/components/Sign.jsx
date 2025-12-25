import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// You can keep useAuth if you need it for the actual login logic later
// import { useAuth } from "../context/Auth/AuthContext"; 

const Sign = () => {
  // FIX: Use local state for the animation toggle
  // false = Sign In, true = Sign Up
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form...", isSignUpMode ? "Sign Up" : "Sign In");
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-black font-sans text-white">
      <div className="relative overflow-hidden w-3xl max-w-full min-h-120 bg-gray-900 rounded-[10px] shadow-[0_14px_28px_rgba(0,0,0,0.5),0_10px_10px_rgba(0,0,0,0.5)]">
        
        {/* --- SIGN UP FORM --- */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 flex flex-col justify-center items-center p-10 bg-gray-900 transition-all duration-500 ease-in-out
          ${isSignUpMode ? "translate-x-full opacity-100 z-50" : "opacity-0 z-10"}`}
        >
          <form className="flex flex-col items-center w-full text-center h-full justify-center" onSubmit={handleFormSubmit}>
            <h1 className="font-bold text-3xl mb-0 text-white">Create Account</h1>
            
            <div className="flex my-5 space-x-3">
              <SocialIcon icon="f" />
              <SocialIcon icon="G+" />
              <SocialIcon icon="in" />
            </div>
            
            <span className="text-xs text-gray-400 mb-4">or use your email for registration</span>
            
            <input type="text" placeholder="Name" className="bg-gray-800 text-white border-none p-3 my-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-[#3BB19B]" />
            <input type="email" placeholder="Email" className="bg-gray-800 text-white border-none p-3 my-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-[#3BB19B]" />
            <input type="password" placeholder="Password" className="bg-gray-800 text-white border-none p-3 my-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-[#3BB19B]" />
            
            <button className="rounded-full border border-[#3BB19B] bg-[#3BB19B] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider transform transition-transform active:scale-95 focus:outline-none mt-4 hover:bg-[#2a8f7d]">
              Sign Up
            </button>
          </form>
        </div>

        {/* --- SIGN IN FORM --- */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 flex flex-col justify-center items-center p-10 bg-gray-900 z-20 transition-all duration-500 ease-in-out
          ${isSignUpMode ? "translate-x-full" : ""}`}
        >
          <form className="flex flex-col items-center w-full text-center h-full justify-center" onSubmit={handleFormSubmit}>
            <h1 className="font-bold text-3xl mb-0 text-white">Sign in to Blog-X</h1>
            
            <div className="flex my-5 space-x-3">
              <SocialIcon icon="f" />
              <SocialIcon icon="G+" />
              <SocialIcon icon="in" />
            </div>
            
            <span className="text-xs text-gray-400 mb-4">or use your email account</span>
            
            <input type="email" placeholder="Email" className="bg-gray-800 text-white border-none p-3 my-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-[#3BB19B]" />
            <input type="password" placeholder="Password" className="bg-gray-800 text-white border-none p-3 my-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-[#3BB19B]" />
            
            <a href="#" className="text-gray-400 text-sm no-underline my-4 hover:text-white transition-colors">Forgot your password?</a>
            
            <button className="rounded-full border border-[#3BB19B] bg-[#3BB19B] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider transform transition-transform active:scale-95 focus:outline-none hover:bg-[#2a8f7d]">
              Sign In
            </button>
          </form>
        </div>

        {/* --- OVERLAY CONTAINER --- */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-500 ease-in-out z-100
          ${isSignUpMode ? "-translate-x-full" : ""}`}
        >
          <div
            className={`bg-linear-to-r from-[#3BB19B] to-[#20B2AA] text-white relative -left-full h-full w-[200%] transform transition-transform duration-500 ease-in-out
            ${isSignUpMode ? "translate-x-1/2" : "translate-x-0"}`}
          >
            {/* Left Overlay Panel (Shows when in Sign Up mode -> Click to go to Sign In) */}
            <div
              className={`absolute top-0 flex flex-col items-center justify-center h-full w-1/2 px-10 text-center transform transition-transform duration-500 ease-in-out
              ${isSignUpMode ? "translate-x-0" : "-translate-x-[20%]"}`}
            >
              <h1 className="font-bold text-3xl mb-0">Welcome Back!</h1>
              <p className="text-sm font-thin leading-5 tracking-wide my-5 text-gray-100">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="bg-transparent border border-white text-white rounded-full text-xs font-bold py-3 px-11 uppercase tracking-wider active:scale-95 focus:outline-none hover:bg-white/20 transition-colors"
                onClick={() => setIsSignUpMode(false)}
              >
                Sign In
              </button>
            </div>

            {/* Right Overlay Panel (Shows when in Sign In mode -> Click to go to Sign Up) */}
            <div
              className={`absolute top-0 right-0 flex flex-col items-center justify-center h-full w-1/2 px-10 text-center transform transition-transform duration-500 ease-in-out
              ${isSignUpMode ? "translate-x-[20%]" : "translate-x-0"}`}
            >
              <h1 className="font-bold text-3xl mb-0">Hello, Friend!</h1>
              <p className="text-sm font-thin leading-5 tracking-wide my-5 text-gray-100">
                Enter your personal details and start journey with us
              </p>
              <button
                className="bg-transparent border border-white text-white rounded-full text-xs font-bold py-3 px-11 uppercase tracking-wider active:scale-95 focus:outline-none hover:bg-white/20 transition-colors"
                onClick={() => setIsSignUpMode(true)}
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

const SocialIcon = ({ icon }) => (
  <a href="#" className="border border-gray-600 rounded-full inline-flex justify-center items-center w-10 h-10 hover:bg-gray-800 transition-colors text-white">
    <span className="font-bold text-sm">{icon}</span>
  </a>
);

export default Sign;