import jwtDecode from "jwt-decode";
import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "./Context/AuthContext/AuthContext";

const PrivateRoute = ({ role }) => {
  const authContext = useContext(AuthContext);
  const { currentUser } = authContext;
  let token = "";
  if (currentUser) token = jwtDecode(String(currentUser.accessToken));
  const location = useLocation();

  return token?.account === role ? (
    <Outlet />
  ) : token?.account === "student" ? (
    <Navigate to="/student/explore-jobs" state={{ from: location }} replace />
  ) : token?.account === "tpo" ? (
    <Navigate to="/tpo/explore-jobs" state={{ from: location }} replace />
  ) : token?.account === "admin" ? (
    <Navigate to="/admin/explore-jobs" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
