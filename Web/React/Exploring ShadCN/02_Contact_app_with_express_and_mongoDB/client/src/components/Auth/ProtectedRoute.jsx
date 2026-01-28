import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // You can replace this with a proper loading spinner
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
