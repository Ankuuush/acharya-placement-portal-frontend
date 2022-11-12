import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "../../Components/navbar";
import ContactUs from "../ContactUs";
import FeedBack from "../FeedBack";
import Topbar from "../../Components/Topbar/Topbar";
import Spinner from "../../Components/Spinner/Spinner";
import TpoExploreJobs from "./TpoExploreJobs";
import PostJobs from "./PostJobs";
import StudentList from "./StudentList";
import Registration from "./Registration";
import constants from "../../Constants";

const Dashboard = ({ page = "" }) => {
  const [component, setComponent] = useState("");

  const changeSelectedComponent = (component) => {
    window.history.pushState({}, null, "/tpo/" + component);
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
        account={"TPO"}
        menu={constants.TPO_MENU}
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
          {component === "explore-jobs" && <TpoExploreJobs />}
          {component === "post-jobs" && <PostJobs />}
          {component === "student-list" && <StudentList />}
          {component === "registration" && <Registration />}
          {component === "feedback" && <FeedBack />}
          {component === "contact-us" && <ContactUs />}
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;
