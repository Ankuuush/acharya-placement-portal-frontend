import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import ProfileForm from "./Profile Form/ProfileForm";
import Search from "../../Components/Search/Search";
import Filter from "../../Components/Filter/Filter";
import JobItem from "../../Containers/Jobitem/Jobitem";
import "./index.css";

const StudentDashboard = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(true);

  useEffect(() => {
    api.get("/student/drives/all").then((response) => {
      setDrives(response.data.data.drives);
      setLoading(false);
    });
  }, []);

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

  const jobs = [{ //TODO: Remove this
    role: "Software Engineer I",
    company: "Infosys",
    logo: "https://professionallyspeaking.net/wp-content/uploads/2017/04/infosys-logo-298x300.jpg",
    date: new Date(),
    jd: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia",
    salary: "3,00,000 LPA"
  },{
    role: "Associate Software Engineer",
    company: "Capgemini",
    logo: "https://media.glassdoor.com/sqll/589990/capgemini-invent-squareLogo-1633426082540.png",
    date: new Date(),
    jd: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia, nunc nisl aliquet nisl, eget aliquet nunc nisl eget nunc. Donec auctor, nisl eget ultricies lacinia",
    salary: "5,50,000 LPA"
  }]

  return (
    <div className="explore-root">
      <div className="left-job-root">
      <Search setDriveData={setDriveData} assignLoading={assignLoading} toggleFilter={toggleFilter} filter={filterOpen} dirves={drives} loading={loading} />
      {drives.map((job, index) => (
        <JobItem key={index} job={job} />
      ))}
      </div>
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
