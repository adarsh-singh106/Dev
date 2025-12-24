import React, { useState } from "react";
import axios from "axios";

const Sign = () => {
  // 1. Initialize state with empty strings ("") to avoid "uncontrolled input" warnings
  const [signState, setSignState] = useState("SignUp");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(""); // Fixed typo: setEmaiil -> setEmail
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // New state to show errors on screen

  const handleOnSubmit = async (e) => {
    // 2. Prevent default browser reload
    e.preventDefault();
    setError(""); // Clear previous errors

    // 3. Validation Logic based on Mode
    if (signState === "SignUp") {
      if (!firstName || !lastName || !email || !password) {
        setError("Please fill all the fields");
        return;
      }
    } else {
      // If Signing In, we only check email and password
      if (!email || !password) {
        setError("Please fill all the fields");
        return;
      }
    }

    try {
      // 4. Determine endpoint (optional, or send signState to backend)
      const payload = { email, password };
      if (signState === "SignUp") {
        payload.firstName = firstName;
        payload.lastName = lastName;
      }

      const response = await axios.post("http://localhost:3001", payload);
      console.log("Data Posted Successfully", response.data);
      alert("Success!");
    } catch (err) {
      console.error("Error Message:", err);
      setError("Failed to submit data.");
    }
  };

  // 5. Toggle Handler
  const toggleState = () => {
    setSignState(signState === "SignUp" ? "SignIn" : "SignUp");
    setError(""); // Clear errors when switching
  };

  return (
    // 1. changed h-screen to min-h-screen for scroll safety
    // 2. added px-4 so it doesn't touch screen edges on mobile
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
      {/* 3. changed w-80 to w-full max-w-sm for responsiveness */}
      <div className="border-2 border-black p-5 flex flex-col w-full max-w-sm justify-center items-center gap-3 rounded-md bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-center">
          {signState === "SignUp" ? "Welcome to Auth-X" : "Login to Enter"}
        </h1>

        <p
          className="text-blue-400 cursor-pointer hover:underline text-center"
          onClick={toggleState}
        >
          {signState === "SignUp"
            ? "Already have an Account? Login"
            : "Don't have an account? Sign Up"}
        </p>

        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

        <form onSubmit={handleOnSubmit} className="flex flex-col gap-3 w-full">
          {signState === "SignUp" && (
            <div className="flex gap-2">
              <input
                className="border p-2 pl-3 w-full rounded-lg outline-none focus:border-blue-400"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                className="border p-2 pl-3 w-full rounded-lg outline-none focus:border-blue-400"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          )}
          <input
            className="border p-2 pl-3 rounded-lg w-full outline-none focus:border-blue-400"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-2 pl-3 rounded-lg w-full outline-none focus:border-blue-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="text-center border p-2 rounded-lg bg-blue-400 hover:bg-blue-600 cursor-pointer text-white font-bold transition-colors"
          >
            {signState === "SignUp" ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sign;
