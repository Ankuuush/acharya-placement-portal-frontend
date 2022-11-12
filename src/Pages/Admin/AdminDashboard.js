import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "../../Components/navbar";
import ContactUs from "../ContactUs";
import FeedBack from "../FeedBack";
import Topbar from "../../Components/Topbar/Topbar";
import Spinner from "../../Components/Spinner/Spinner";
import constants from "../../Constants";
import Users from "./Users";
import AddTpo from "./AddTpo";
import AddAdmin from "./AddAdmin";

const AdminDashboard = ({ page = "" }) => {
  const [component, setComponent] = useState("");

  const changeSelectedComponent = (component) => {
    window.history.pushState({}, null, "/admin/" + component);
    setComponent(component);
  };

  useEffect(() => {
    if (page) setComponent(page);
  }, [page]);

  if (!component)
    return (
      <div style={{ marginTop: "40vh", marginLeft: "50vw" }}>
        <Spinner />
      </div>
    );

  return (
    <div style={{ display: "flex" }}>
      <NavBar
        account={"ADMIN"}
        menu={constants.ADMIN_MENU}
        setComponent={changeSelectedComponent}
        currentComponent={component}
      />
      <div
        style={{
          flexGrow: 1,
          backgroundColor: "#f3f4f8",
          height: "100vh",
          maxHeight: "fit-content",
        }}
      >
        <Topbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, background: "#f3f4f8" }}>
          {component === "users" && <Users />}
          {component === "add-tpo" && <AddTpo />}
          {component === "add-admin" && <AddAdmin />}
          {component === "feedback" && <FeedBack />}
          {component === "contact-us" && <ContactUs />}
        </Box>
      </div>
    </div>
  );
};

export default AdminDashboard;
