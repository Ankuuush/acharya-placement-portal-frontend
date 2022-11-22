import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../Components/navbar";
import ContactUs from "../ContactUs";
import FeedBack from "../FeedBack";
import AppliedJobs from "./AppliedJobs";
import Resume from "./Resume";
import StudentDashboard from "./StudentDashboard";
import Topbar from "../../Components/Topbar/Topbar";
import AuthContext from "../../Context/AuthContext/AuthContext";
import api from "../../api";
import { toast } from "react-toastify";
import ProfileForm from "./Profile Form/ProfileForm";
import Spinner from "../../Components/Spinner/Spinner";
import constants from "../../Constants";
import DriveDetails from "./DriveDetails";
import { useNavigate } from "react-router-dom";
import SavedJobs from "./Saved Jobs/SavedJobs";

const Dashboard = ({ page = "" }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { currentUser } = authContext;
  const [component, setComponent] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [profileData, setProfileData] = useState(null);

  const changeSelectedComponent = (component, scope) => {
    navigate("/student/" + component); //useful to pass params in url
    setComponent(scope || component);
  };

  const toggleDriveBookmark = (driveId, cb) => {
    api.post(`/student/drives/${driveId}/bookmark`)
    .then((response) => {
      cb(response.data.data.bookmarked);
      toast.success(response.data.data.bookmark ? "Drive Bookmarked" : "Bookmark Removed")
    })
    .catch((error)=>{
      toast.error("Server Error!!")
    });
  }

  useEffect(() => {
    async function studentProfile() {
      let token = "";
      await currentUser
        .getIdTokenResult()
        .then((result) => {
          token = result.claims;
        })
        .catch((error) => {
          console.log(error);
        });

      if (token.account === "student") {
        api
          .get("/student/profile/progress")
          .then((response) => {
            if (response.data.data.progress.completed) {
              if (page) setComponent(page);
              return;
            }
            setProfileData(response.data.data);
            setComponent("student-profile");
            if (!response.data.data.progress.completedPercentage) {
              setActiveStep(0);
              return;
            }
            console.log(response);
            switch (response.data.data.progress.goToStep) {
              case "basicDetails":
                setActiveStep(0);
                break;
              case "educationDetails":
                setActiveStep(1);
                break;
              case "skills":
              case "softSkills":
              case "languages":
                setActiveStep(2);
                break;
              case "internshipDetails":
                setActiveStep(3);
                break;
              case "projects":
                setActiveStep(4);
                break;
              case "certifications":
                setActiveStep(5);
                break;
              case "achievements":
                setActiveStep(6);
                break;
              default:
                setActiveStep(0);
            }
          })
          .catch(() => {
            toast.error("Server Error!");
          });
      } else if (page) {
        setComponent(page);
      }
    }

    studentProfile();
  }, [page, currentUser]);



  if (!component)
    return (
      <div style={{ marginTop: "40vh", marginLeft: "50vw" }}>
        <Spinner />
      </div>
    );

  if (component === "student-profile")
    return (
      <ProfileForm
        setComponent={changeSelectedComponent}
        profileData={profileData}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    );

  return (
    <div style={{ display: "flex" }}>
      <NavBar
        account={"STUDENT"}
        menu={constants.STUDENT_MENU}
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
          {component === "explore-jobs" && (
            <StudentDashboard change={changeSelectedComponent} toggleDriveBookmark={toggleDriveBookmark} />
          )}
          {component === "applied-jobs" && <AppliedJobs />}
          {component === "resume" && <Resume />}
          {component === "feedback" && <FeedBack />}
          {component === "contact-us" && <ContactUs />}
          {component === "drive-details" && <div style={{padding: "0px 20px"}}>
          <DriveDetails toggleDriveBookmark={toggleDriveBookmark} />
            </div>}
            {component === "saved-jobs" && (
            <SavedJobs change={changeSelectedComponent} toggleDriveBookmark={toggleDriveBookmark} />
          )}
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;
