import { Box } from "@mui/material";
import React, {useContext} from "react";
import EducationalDetails from "../../../Components/ProfileForm/EducationalDetails/educationalDetails";
import PersonalInformation from "../../../Components/ProfileForm/Personal Information/personalInformation";
import Skills from "../../../Components/ProfileForm/Skills/Skills";
import Internships from "../../../Components/ProfileForm/Internship Experience/internships";
import Projects from "../../../Components/ProfileForm/Projects/Projects";
import Certifications from "../../../Components/ProfileForm/Certifications/Certifications";
import Achievements from "../../../Components/ProfileForm/Achievements/Achievements";
import Steps from "../../../Components/StepsFolder/Steps";
import ProgressBar from "../../../Components/ProgressBar";
import PlacementLogoSmall from "../../../Components/Logo/PlacementLogoSmall";
import SquareBadge from "../../../Components/SquareBadge/SquareBadge";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext/AuthContext";
import "./ProfileForm.css";

const ProfileForm = ({setComponent, profileData, activeStep, setActiveStep }) => {
  const navigate=useNavigate();
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  const renderSwitch = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalInformation
            profileData={profileData?.profile?.basicDetails}
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
            profileData={profileData?.profile}
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
        case 7:
          setComponent('explore-jobs')
          break;
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
    <div style={{display: "flex"}}>
      <Box
        component="main"
        sx={{ p: 3, flex: 3.5}}
      >
        <div style={{ width:"100%",display:"flex",justifyContent:"space-between", marginBottom: 50}}>
        <div style={{display:"flex",alignItems: "center"}}>
        <PlacementLogoSmall/>
        <SquareBadge text="Student Onboarding" />
        </div>
        <div style={{width:"60%",display:"flex",alignItems:"center"}}>
      <ProgressBar progress={profileData.progress.completedPercentage}/>
      <button onClick={async()=> await logout()}>Logout</button>
      </div>
        </div>
      {/* <div style={{height:"1px",background:"grey",marginBottom:"2rem"}}></div> */}
        
    <div style={{display:"flex"}}>
        {/* <Steps activeStep={activeStep} /> */}
        {renderSwitch()}
        </div>
      </Box>
      <div className="right-bloc-flow">
        <p className="right-bloc-text">Add Your Basic Details</p>
      </div>
    </div>
  );
};

export default ProfileForm;
