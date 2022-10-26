import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import ProfileForm from "./Profile Form/ProfileForm";
import Search from "./Search/Search";
import Filter from "./Filter/Filter";
import "./index.css";

const StudentDashboardComponent = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(true);

  const setDriveData = (data) => {
    setDrives(data);
    setLoading(false);
  }

  const assignLoading = (value) => {
    setLoading(value);
  }

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  }

  return (
    <div className="explore-root">
      <Search setDriveData={setDriveData} assignLoading={assignLoading} toggleFilter={toggleFilter} filter={filterOpen} dirves={drives} loading={loading} />
      {filterOpen && <Filter />}
      </div>
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
