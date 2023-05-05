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
import Spinner from "../../Components/Spinner/Spinner"
import { Alert } from "@mui/material";
import "./index.css"

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
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProfile();
  }, []);

  function getProfile() {
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
        setSettings(response.data.data.settings);
        updateBasicDetails();
        setLoading(false);
      })
      .catch(() => {
        toast.error("Server Error!!");
        setLoading(false);
      });
  }

  const updateBasicDetails = () => {
    setBasicDetails((prevState) => {
      const dobDate = FormatDate(prevState.dob);
      return {
        ...prevState,
        branch: BranchMap(prevState.studentMeta.department),
        dob: dobDate,
      };
    });
  };

  const downloadResumePdf = () => {
    api
      .get("/student/profile/pdf", {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "resume.pdf");
        document.body.appendChild(link);
        link.click();

        toast.success("Resume Downloaded!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server Error!!");
      }
      );
  }

  return (
    <div>
      {loading ? <Spinner /> : <div>
      {settings && !settings.educationEditAllowed && <div style={{padding: "3px 30px", marginTop: 5}}>
        <Alert style={{ marginBottom: "1rem", border: "2px solid #FFA22C" }} severity="warning">
            <strong>Your department TPO has disabled education edits, you cannot edit your academic related details until this is enabled again. You may still edit other parts of your profile as needed.</strong>
      </Alert>
        </div>}
      <div style={{padding: "3px 30px", display: "flex", alignItems: "flex-end",justifyContent: "space-between"}}>
        <h3>Your Resume</h3>
      <button onClick={downloadResumePdf} className="down_resume_btn">Download Resume</button>
      </div>
      <div style={{padding: 30}}>
      <div
        style={{
          backgroundColor: "white",
          padding: "4rem",
          borderTop: "10px solid #1f357e",
          boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
          borderRadius: 5,
        }}
      >
        <PersonalInformation data={basicDetails} setData={setBasicDetails} />
        <EducationDetails
          data={educationDetails}
          setData={setEducationDetails}
          refreshProfile={getProfile}
          educationAllowed={settings.educationEditAllowed}
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
      </div>
    </div>
        </div>}
    </div>
  );
};

export default Resume;
