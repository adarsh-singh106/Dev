import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";

const Sign = () => {
  // Extract everything we need from Context
  const { state, dispatch, submitForm } = useAuth();
  const location = useLocation(); // Gets current URL info
  const navigate = useNavigate(); // Hook to change URL
  // Sync URL with Context State
  useEffect(() => {
    if (location.pathname === "/login") {
      dispatch({ type: "SWITCH_MODE", payload: "SignIn" });
    } else if (location.pathname === "/register") {
      dispatch({ type: "SWITCH_MODE", payload: "SignUp" });
    }
  }, [location.pathname, dispatch]);

  // Watch for successful login and redirect
  useEffect(() => {
    const user = localStorage.getItem("user");
    // If user is found and loading is finished -> Go to Dashboard
    if (user && !state.loading) {
      navigate("/dashboard");
    }
  }, [state.loading, navigate]);

  // Destructure state for cleaner JSX
  const { signState, firstName, lastName, email, password, error, loading } =
    state;
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
          onClick={() =>
            navigate(signState === "SignUp" ? "/login" : "/register")
          }
        >
          {signState === "SignUp"
            ? "Already have an Account? Login"
            : "Don't have an account? Sign Up"}
        </p>

        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

        <form onSubmit={submitForm} className="flex flex-col gap-3 w-full">
          {signState === "SignUp" && (
            <div className="flex gap-2">
              <input
                className="border p-2 pl-3 w-full rounded-lg outline-none focus:border-blue-400"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "firstName",
                    value: e.target.value,
                  })
                }
              />
              <input
                type="text"
                className="border p-2 pl-3 w-full rounded-lg outline-none focus:border-blue-400"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "lastName",
                    value: e.target.value,
                  })
                }
              />
            </div>
          )}
          <input
            className="border p-2 pl-3 rounded-lg w-full outline-none focus:border-blue-400"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "email",
                value: e.target.value,
              })
            }
          />
          <input
            className="border p-2 pl-3 rounded-lg w-full outline-none focus:border-blue-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "password",
                value: e.target.value,
              })
            }
          />
          <button
            type="submit"
            disabled={loading} // Optional: Disable button while loading
            className="text-center border p-2 rounded-lg bg-blue-400 hover:bg-blue-600 cursor-pointer text-white font-bold transition-colors"
          >
            {loading
              ? "Processing..."
              : signState === "SignUp"
              ? "Sign Up"
              : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sign;
