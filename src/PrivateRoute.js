import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./Context/AuthContext/AuthContext";

const PrivateRoute = ({role}) => {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const { token } = authContext;
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login?redirect=" + location.pathname, { replace: true });
      return;
    }
  }, []);

  return (
    <>
      {token?.account === role ? (
        <Outlet />
      ) : token?.account === "student" ? (
        <Navigate
          to="/student/dashboard"
          state={{ from: location }}
          replace
        />
      ) : token?.account === "tpo" ? (
        <Navigate to="/tpo/explore-jobs" state={{ from: location }} replace />
      ) : token?.account === "admin" ? (
        <Navigate to="/admin/explore-jobs" state={{ from: location }} replace />
      ) : null}
    </>
    // <>
    //   {role==='go'?<Outlet/>:<Navigate to={'./login'} state={{from:location}} replace />
    // }
    // </>
  );
};

export default PrivateRoute;
