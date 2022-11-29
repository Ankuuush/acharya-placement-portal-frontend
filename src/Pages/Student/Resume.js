import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import BranchMap from "../../Components/Items/BranchMap";
import FormatDate from "../../Components/Items/FormatDate";
import Achievements from "../../Components/Resume/Achievements/Achievements";
import Certifications from "../../Components/Resume/Certifications/Certifications";
import EducationDetails from "../../Components/Resume/EducationDetails/EducationDetails";
import Internships from "../../Components/Resume/Internships/Internships";
import PersonalInformation from "../../Components/Resume/PersonalInformation";
import Projects from "../../Components/Resume/Projects/Projects";
import Skills from "../../Components/Resume/Skills/Skills";

const Resume = () => {
  const [achievements, setAchievements] = useState([]);
  const [basicDetails, setBasicDetails] = useState({ studentMeta: {} });
  const [certifications, setCertifications] = useState([]);
  const [educationDetails, setEducationDetails] = useState({
    tenth: {},
    twelfth: {},
    ug: {},
  });
  
  const [languages, setLanguages] = useState([]);
  const [internshipDetails, setInternshipDetails] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);

  useEffect(() => {
    api
      .get("/student/profile")
      .then((response) => {
        const profileData = response.data.data.profile;
        setBasicDetails(profileData.basicDetails);
        setAchievements(profileData.achievements);
        setCertifications(profileData.certifications);
        setEducationDetails(profileData.educationDetails);
        setLanguages(profileData.languages);
        setInternshipDetails(profileData.internshipDetails);
        setProjects(profileData.projects);
        setSkills(profileData.skills);
        setSoftSkills(profileData.softSkills);
        updateBasicDetails();
      })
      .catch(() => {
        toast.error("Server Error!!");
      });
  }, []);

  const updateBasicDetails = () => {
    setBasicDetails((prevState) => {
      const dobDate=FormatDate(prevState.dob)
      return {
        ...prevState,
        branch: BranchMap(prevState.studentMeta.department),
        dob:dobDate
      };
    });
    
  };

  return (
    // <Box sx={{ display: "flex" }}>
    //   <NavBar />
    //   <Box component="main" sx={{ flexGrow: 1, p: 3, background: "" }}>
    <>
        <PersonalInformation data={basicDetails} setData={setBasicDetails} />
        <EducationDetails
          data={educationDetails}
          setData={setEducationDetails}
        />
        <Skills
          skills={skills}
          setSkills={setSkills}
          softSkills={softSkills}
          setSoftSkills={setSoftSkills}
          languages={languages}
          setLanguages={setLanguages}
        />
        <Internships data={internshipDetails} setData={setInternshipDetails} />
        <Projects data={projects} setData={setProjects} />
        <Certifications data={certifications} setData={setCertifications} />
        <Achievements data={achievements} setData={setAchievements} />
        </>
    //   </Box>
    // </Box>
  );
};

export default Resume;
