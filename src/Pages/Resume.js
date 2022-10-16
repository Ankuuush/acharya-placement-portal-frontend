import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import NavBar from "../Components/navbar";
import Achievements from "../Components/Resume/Achievements/Achievements";
import Certifications from "../Components/Resume/Certifications/Certifications";
import EducationDetails from "../Components/Resume/EducationDetails/EducationDetails";
import Internships from "../Components/Resume/Internships/Internships";
import PersonalInformation from "../Components/Resume/PersonalInformation";
import Projects from "../Components/Resume/Projects/Projects";
import Skills from "../Components/Resume/Skills/Skills";

const Resume = () => {
  const [profileData, setProfileData] = useState({
    achievements: [],
    basicDetails: {},
    certifications: [],
    educationDetails: { tenth: {}, twelfth: {}, ug: {} },
    twelfth: [],
    languages: [],
    internshipDetails:[],
    projects: [],
    skills: [],
    softSkills: [],
  });
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  useEffect(() => {
    api
      .get("/student/profile")
      .then((response) => {
        setProfileData(response.data.data.profile);
      })
      .catch(() => {
        toast.error("Server Error!!");
      });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, background: "" }}>
        <PersonalInformation data={profileData.basicDetails} />
        <EducationDetails data={profileData.educationDetails} />
        <Skills skills={profileData.skills} softSkills={profileData.softSkills} languages={profileData.languages} />
        <Internships data={profileData.internshipDetails} />
        <Projects data={profileData.projects} />
        <Certifications data={profileData.certifications} />
        <Achievements data={profileData.achievements} />
      </Box>
    </Box>
  );
};

export default Resume;
