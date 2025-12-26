import React from "react";
import { useAuth } from "../../context/Auth/AuthContext";
import SocialIcon from "./SocialIcon";

const SignUpForm = ({ onRegisterSuccess }) => {
  const { state, dispatch } = useAuth();
  const { name, email, password } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your API registration logic here
    // On success:
    onRegisterSuccess(); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full text-center h-full justify-center px-10">
      <h1 className="font-bold text-3xl mb-0 text-white">Create Account</h1>

      <div className="flex my-5 space-x-3">
        <SocialIcon icon="f" />
        <SocialIcon icon="G+" />
        <SocialIcon icon="in" />
      </div>

      <span className="text-xs text-gray-400 mb-4">or use your email for registration</span>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })}
        className="bg-gray-800 text-white border-none p-3 my-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-[#3BB19B]"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
        className="bg-gray-800 text-white border-none p-3 my-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-[#3BB19B]"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })}
        className="bg-gray-800 text-white border-none p-3 my-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-[#3BB19B]"
      />

      <button className="rounded-full border border-[#3BB19B] bg-[#3BB19B] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider transform transition-transform active:scale-95 focus:outline-none mt-4 hover:bg-[#2a8f7d]">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;