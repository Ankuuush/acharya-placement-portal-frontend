import React, { useContext } from "react";
import {Navigate } from "react-router-dom";
import AuthContext from "./Context/AuthContext/AuthContext";

const PrivateRoute = ({children}) => {
  const authContext = useContext(AuthContext);
  const {currentUser}=authContext;
  return (
     currentUser ? children : <Navigate to="/login" />
  );
};

export default PrivateRoute;
