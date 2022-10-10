import { Box } from "@mui/material";
import React from "react";
import EducationalDetails from "../../Components/ProfileForm/EducationalDetails/educationalDetails";
import PersonalInformation from "../../Components/ProfileForm/Personal Information/personalInformation";
import Skills from "../../Components/ProfileForm/Skills/Skills";
import Internships from "../../Components/ProfileForm/Internship Experience/internships";
import Projects from "../../Components/ProfileForm/Projects/Projects";
import Certifications from "../../Components/ProfileForm/Certifications/Certifications";
import Achievements from "../../Components/ProfileForm/Achievements/Achievements";
import Steps from "../../Components/StepsFolder/Steps";
import NavBar from "../../Components/navbar";

const ProfileForm = ({ profileData, activeStep, setActiveStep }) => {
  const renderSwitch = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalInformation
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      case 1:
        return (
          <EducationalDetails
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      case 2:
        return (
          <Skills
            profileData={profileData}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      case 3:
        return (
          <Internships activeStep={activeStep} setActiveStep={setActiveStep} />
        );
      case 4:
        return (
          <Projects activeStep={activeStep} setActiveStep={setActiveStep} />
        );
      case 5:
        return (
          <Certifications
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      case 6:
        return (
          <Achievements activeStep={activeStep} setActiveStep={setActiveStep} />
        );
      default:
        return (
          <PersonalInformation
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, display: "flex", background: "" }}
      >
        <Steps activeStep={activeStep} />
        {renderSwitch()}
      </Box>
    </Box>
  );
};

export default ProfileForm;
