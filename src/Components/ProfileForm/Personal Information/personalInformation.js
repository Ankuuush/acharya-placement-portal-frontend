import React, { useContext, useEffect, useState } from "react";
import api from "../../../api.js";
import { toast } from "react-toastify";
import PersonalInformationItem from "./PersonalInformationItem.js";
import AuthContext from "../../../Context/AuthContext/AuthContext.js";
import BranchMap from "../../Items/BranchMap";

const PersonalInformation = ({ profileData, activeStep, setActiveStep }) => {
  const authContext = useContext(AuthContext);
  const { currentUser } = authContext;
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
    api
      .post("/student/profile/basic", {
        photoUrl: personalInfo.photoUrl,
        phone: personalInfo.phone,
        gender: personalInfo.gender,
        usn: personalInfo.usn,
        dob: personalInfo.dob,
      })
      .then(() => {
        toast.success("Data saved!");
        setActiveStep((activeStep + 1) % 7);
      })
      .catch(() => {
        toast.error("Server Error!");
        return true;
      });
  };

  useEffect(() => {
    const displayName = currentUser.displayName.split(" ");
    const firstName = displayName[0];
    let lastName = "";
    for (let i = 1; i < displayName.length; i++)
      lastName += displayName[i] + " ";
    setPersonalInfo({
      ...personalInfo,
      firstName: firstName,
      lastName: lastName,
      email: currentUser.email,
      usn: profileData.usn,
    });
    setPersonalInfo((prevState) => {
      return {
        ...prevState,
        branch: BranchMap(profileData.studentMeta.department),
      };
    });
  }, []);

  return (
    <PersonalInformationItem
      personalInfo={personalInfo}
      setPersonalInfo={setPersonalInfo}
      handleSubmit={handleSubmit}
    />
  );
};

export default PersonalInformation;
