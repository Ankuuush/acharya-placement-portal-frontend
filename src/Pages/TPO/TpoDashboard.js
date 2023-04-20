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
import { useNavigate } from "react-router-dom";
import JobPreview from "./JobPreview/JobPreview";
import ShortlistedStudents from "./JobPreview/ShortlistedStudents";
import DriveDetailsTPO from "../../Components/DriveDetailsItem/DriveDetailsTPO/DriveDetailsTPO";
import DriveDetails from "../Student/DriveDetails";
import StudentDetails from "./StudentDetails";

const Dashboard = ({ page = "" }) => {
  const navigate = useNavigate();
  const [component, setComponent] = useState("");

  const changeSelectedComponent = (component, scope) => {
    navigate("/tpo/" + component); //useful to pass params in url
    setComponent(scope || component);
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
          {component === "explore-jobs" && <TpoExploreJobs change={changeSelectedComponent} />}
          {component === "drive-details" && <DriveDetailsTPO />}
          {component === "post-jobs" && <PostJobs />}
          {component === "student-list" && <StudentList />}
          {component === "registration" && <Registration />}
          {component === "feedback" && <FeedBack />}
          {component === "contact-us" && <ContactUs />}
          {component === "job-preview" && <JobPreview />}
          {component === "preview-students" && <ShortlistedStudents />}
          {component === "student-details" && <StudentDetails />}
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;
