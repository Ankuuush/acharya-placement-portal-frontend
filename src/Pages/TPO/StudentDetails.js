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
import "../Student/index.css"

const StudentDetails = () => {
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProfile();
  }, []);

  const profileData={
    "_id": "631f67d3cdb9fda27895b705",
    "uid": "JluFMmhlJ5UNOhYrjtCvhJbu3OI2",
    "__v": 0,
    "achievements": [
        {
            "title": "dfgddg",
            "description": "dfgfg",
            "link": "http://www.facebook.com",
            "organization": "dsffdsfsf",
            "_id": "6388b24c5c14b637bad560ba"
        }
    ],
    "basicDetails": {
        "photoUrl": "https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/profile-pictures/JluFMmhlJ5UNOhYrjtCvhJbu3OI2",
        "phone": "1234567890",
        "gender": "male",
        "usn": "1AY19IS012",
        "dob": "2022-10-13T00:00:00.000Z",
        "_id": "631399ed934ddabffcc78ecf",
        "firstName": "Ankush",
        "lastName": "Kumar",
        "email": "ankushk.19.beis@acharya.ac.in",
        "createdOn": 1662228029043,
        "blacklisted": false,
        "uid": "JluFMmhlJ5UNOhYrjtCvhJbu3OI2",
        "role": "student",
        "studentMeta": {
            "department": "BEIS",
            "year": 19,
            "placed": false
        },
        "created_by": "system",
        "slug": "ankush-kumar-3Ok6bS0IV",
        "__v": 0
    },
    "certifications": [
        {
            "organization": "Google",
            "name": "ACE Certified",
            "description": "Certified on the Google Cloud Platform",
            "certificateLink": "https://www.facebook.com",
            "_id": "63296b858dde1c4f358c58df"
        },
        {
            "organization": "dsggssgs",
            "name": "42gears",
            "description": "dsgsdgsssd",
            "certificateLink": "http://www.facebook.com",
            "_id": "63296cc88dde1c4f358c58e5"
        },
        {
            "organization": "Tesla",
            "name": "dsfdsf",
            "description": "fsfsfsf",
            "certificateLink": "http://www.facebook.com",
            "_id": "6388b840ba7afb47fc584cbe"
        }
    ],
    "educationDetails": {
        "tenth": {
            "institution": "acharya",
            "startYear": 1900,
            "endYear": 1900,
            "gradeScale": 10,
            "grade": 9,
            "_id": "63f22f1caadef232605a418a"
        },
        "twelfth": {
            "institution": "acharya",
            "startYear": 1901,
            "endYear": 1902,
            "gradeScale": 10,
            "grade": 2,
            "_id": "6392257a468beb25b3bc1c4f"
        },
        "ug": {
            "institution": "acharya",
            "startYear": 1901,
            "endYear": 1901,
            "gradeScale": 10,
            "grade": 2,
            "_id": "63922581468beb25b3bc1c54"
        }
    },
    "internshipDetails": [
        {
            "companyName": "Google",
            "startMonth": "jan",
            "startYear": 2018,
            "endMonth": "jan",
            "endYear": 2018,
            "role": "Software Engineer",
            "description": "Worked on the Google Cloud Platform",
            "ongoing": true,
            "_id": "63262145b17804641c04582f"
        },
        {
            "companyName": "Amazon",
            "startMonth": "jan",
            "startYear": 2000,
            "endMonth": "jan",
            "endYear": 2000,
            "role": "CEO",
            "description": "I am the ceo bitch",
            "ongoing": true,
            "_id": "6326b005d3ca1d77bb93833f"
        },
        {
            "companyName": "BHatindHa",
            "startMonth": "feb",
            "startYear": 2022,
            "endMonth": "jan",
            "endYear": 2000,
            "role": "Founder",
            "description": "hytgjntgjgj",
            "ongoing": true,
            "_id": "63270073cce8886f8728334a"
        }
    ],
    "languages": [
        {
            "_id": "6307a2000f099383daab6473",
            "name": "Scottish"
        }
    ],
    "projects": [
        {
            "title": "Event Management System",
            "description": "Event Management System",
            "link": "http://www.facebook.com",
            "_id": "63a42a209ef76b1476919070"
        },
        {
            "title": "dfgffdgd",
            "description": "dfgfd",
            "link": "http://www.facebook.com",
            "_id": "63f22f82aadef232605a41b1"
        }
    ],
    "skills": [
        {
            "_id": "63062e20c029d7293780cc8f",
            "name": "Cold Fusion"
        }
    ],
    "softSkills": [
        {
            "_id": "6307a6488344cc779086e63d",
            "name": "Logical reasoning"
        }
    ]
}

  function getProfile() {
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
        setLoading(false);
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

//   const downloadResumePdf = () => {
//     api
//       .get("/student/profile/pdf", {
//         responseType: "blob",
//       })
//       .then((response) => {
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement("a");
//         link.href = url;
//         link.setAttribute("download", "resume.pdf");
//         document.body.appendChild(link);
//         link.click();

//         toast.success("Resume Downloaded!");
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error("Server Error!!");
//       }
//       );
//   }

  return (
    <div>
      {loading ? <Spinner /> : <div>
      <div style={{padding: "3px 30px", display: "flex", alignItems: "flex-end",justifyContent: "space-between"}}>
        <h3>Your Resume</h3>
      {/* <button onClick={downloadResumePdf} className="down_resume_btn">Download Resume</button> */}
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

export default StudentDetails;
