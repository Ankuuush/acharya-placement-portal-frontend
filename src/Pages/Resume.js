import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import NavBar from "../Components/navbar";
import UpdateResumeModal from "../Components/UpdateResumeModal";

const Resume = () => {
  const [profileData, setProfileData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    api
      .get("/student/profile")
      .then((response) => {
        setProfileData(response.data);
        console.log(response);
      })
      .catch(() => {
        toast.error("Server Error!!");
      });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, background: "" }}>
        <div>Resume</div>
      </Box>
    </Box>
  );
};

export default Resume;
