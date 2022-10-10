import { Box } from "@mui/material";
import React from "react";
import NavBar from "../Components/navbar";

const FeedBack = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, background: "" }}>
        <div>FeedBack</div>
      </Box>
    </Box>
  );
};

export default FeedBack;
