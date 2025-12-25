import { createContext, useContext, useReducer } from "react";
import { authReducer } from "./authReducer";

const initialState = {
  signState: "SignUp",
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  error: "",
  loading: "",
  // Verfication Status
  verificationStatus: "idle",
  verificationMessage: "",
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return <AuthContext.Provider value={{ state,dispatch }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
