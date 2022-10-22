import { Box, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import NavBar from "../../Components/navbar";
import AuthContext from "../../Context/AuthContext/AuthContext";
import ProfileForm from "./Profile Form/ProfileForm";

const StudentDashboardComponent = () => {
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

const StudentDashboard = ({ activeStep, setActiveStep }) => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [step, setStep] = useState(-1);
  useEffect(() => {
    api
      .get("/student/profile/progress")
      .then((response) => {
        if (response.data.data.progress.completed) {
          setLoading(false);
          return;
        }
        setProfileData(response.data.data);
        console.log(response);
        switch (response.data.data.progress.goToStep) {
          case "basicDetails":
            setStep(0);
            setActiveStep(0);
            break;
          case "educationDetails":
            setStep(1);
            setActiveStep(1);
            break;
          case "skills":
          case "softSkills":
          case "languages":
            setStep(2);
            setActiveStep(2);
            break;
          case "internshipDetails":
            setStep(3);
            setActiveStep(3);
            break;
          case "projects":
            setStep(4);
            setActiveStep(4);
            break;
          case "certifications":
            setStep(5);
            setActiveStep(5);
            break;
          case "achievements":
            setStep(6);
            setActiveStep(6);
            break;
          default:
            setStep(-1);
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error("Server Error!");
      });
  }, []);
  return (
    <>
      {!loading &&
        (step === -1 ? (
          <StudentDashboardComponent />
        ) : (
          // <Navigate
          //   to={"/student/build-resume"}
          //   state={{ from: location }}
          //   replace
          // />
          <ProfileForm
            profileData={profileData}
            activeStep={activeStep}
            setActiveStep={setActiveStep} 
          />
        ))}
    </>
  );
};

export default StudentDashboard;
