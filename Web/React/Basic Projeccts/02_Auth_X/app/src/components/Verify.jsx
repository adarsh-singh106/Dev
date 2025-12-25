import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext"; 

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  // Extract state and function from Context
  // ✅ This will now work because we added verifyEmail to the Provider value
  const { verifyEmail, state, dispatch } = useAuth(); // <--- Added dispatch here
  const { verificationStatus, verificationMessage } = state;

  // 1. Trigger Verification on Mount
  useEffect(() => {
    // Only verify if we have a token and we haven't started yet
    if (token && verificationStatus === 'idle') {
      verifyEmail(token);
    }

    // 🆕 CLEANUP: Reset status when leaving the page
    // This ensures if the user comes back later, they start fresh
    return () => {
        dispatch({ type: "VERIFY_RESET" }); // We need to add this case to reducer (optional but recommended)
        // OR simpler: you can dispatch a reset to 'idle' manually if you don't want a new case
        // dispatch({ type: "VERIFY_START", payload: "idle" }); // Hacky way
    };
  }, [token]); // dependency array simplified

  // 2. Redirect on Success
  useEffect(() => {
    if (verificationStatus === 'success') {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [verificationStatus, navigate]);

  const isSuccess = verificationStatus === 'success';
  const isError = verificationStatus === 'error';

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 px-4">
      <div className={`p-8 rounded shadow-md text-center bg-white max-w-sm w-full border-t-4 ${isSuccess ? "border-green-500" : isError ? "border-red-500" : "border-blue-500"}`}>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {isSuccess ? "Verified!" : isError ? "Verification Failed" : "Verifying..."}
        </h2>
        
        <p className={`text-lg ${isSuccess ? "text-green-600" : isError ? "text-red-500" : "text-gray-600"}`}>
          {verificationMessage}
        </p>

        {isSuccess && <p className="text-sm text-gray-400 mt-4">Redirecting to login...</p>}
      </div>
    </div>
  );
};

export default Verify;