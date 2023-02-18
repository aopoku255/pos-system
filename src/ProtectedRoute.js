import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const accessToken = userinfo.refreshToken;
  return <>{accessToken ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoute;
