import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext"; // Adjust path if needed
import AppRoutes from "./routes/AppRoutes"; // Adjust path (e.g., './routes/AppRoutes')

const App = () => {
  return <AppRoutes />;
};

export default App;
