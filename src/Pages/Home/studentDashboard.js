import { Button, Alert } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import AuthContext from "../../Context/AuthContext/AuthContext";
import ProfileForm from "../Profile Form/ProfileForm";

const StudentDashboardComponent = () => {
  const [error, setError] = useState(false);
  const authContext = useContext(AuthContext);
  const { currentUser, logout } = authContext;
  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to logout.");
    }
  };

  return (
    <>
      <div>Home</div>
      {error && <Alert variant="danger">{error}</Alert>}
      <h4>Email: {currentUser.email}</h4>
      <p>Name: {currentUser.displayName}</p>
      <Button onClick={handleClick}>Logout</Button>
    </>
  );
};

const StudentDashboard = ({activeStep, setActiveStep }) => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({})
  const [step, setStep] = useState(-1);
  const location = useLocation();
  useEffect(() => {
    api
      .get("/student/profile/progress")
      .then((response) => {
        if (response.data.data.progress.completed) {
          setLoading(false);
          return;
        }
        setProfileData(response.data.data)
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
      {!loading && (step === -1 ? (
        <StudentDashboardComponent />
      ) : (
        // <Navigate
        //   to={"/student/build-resume"}
        //   state={{ from: location }}
        //   replace
        // />
        <ProfileForm profileData={profileData} activeStep={activeStep} setActiveStep={setActiveStep}/>
      ))}
    </>
  );
};

export default StudentDashboard;
