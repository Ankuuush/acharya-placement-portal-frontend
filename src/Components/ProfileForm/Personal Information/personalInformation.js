import React, {useState } from "react";
import api from "../../../api.js";
import { toast } from "react-toastify";
import PersonalInformationItem from "./PersonalInformationItem.js";

const PersonalInformation = ({ activeStep, setActiveStep }) => {
  
  const [personalInfo, setPersonalInfo] = useState({
    photoUrl: "",
    phone: "",
    gender: "",
    branch: "",
    usn: "",
    dob: "",
  });
  

  const handleSubmit = async () => {
    if (!personalInfo.photoUrl) {
      toast.error("Please Upload Profile Picture!");
      return true;
    }
      api.post("/student/profile/basic", {
        photoUrl: personalInfo.photoUrl,
        phone: personalInfo.phone,
        gender: personalInfo.gender,
        //   branch: personalInfo.branch,
        usn: personalInfo.usn,
        dob: personalInfo.dob,
      }).then(()=>{toast.success("Data saved!");
      setActiveStep((activeStep + 1) % 7);
      }).catch(()=>{
        toast.error("Server Error!");
        return true
      })
    
  };

  
  

  return (
    <PersonalInformationItem personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} handleSubmit={handleSubmit}/>
  );
};

export default PersonalInformation;
