import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Protected({ Component, ...rest }) {
  const { token } = useAuth();

  return token ? (
    <Component {...rest} /> // Render the protected component if token exists
  ) : (
    <Navigate to="/login" /> // Redirect to login if no token
  );
}

export default Protected;
