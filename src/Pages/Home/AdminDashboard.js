import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "../../Components/navbar";
import AuthContext from "../../Context/AuthContext/AuthContext";

const AdminDashboard = () => {
  const authContext = useContext(AuthContext);
  const { currentUser, logout } = authContext;
  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch {
      toast.error("Failed to logout.");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, background: "" }}>
        <div>Home</div>
        <h4>Email: {currentUser.email}</h4>
        <p>Name: {currentUser.displayName}</p>
        <Button onClick={handleClick}>Logout</Button>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
