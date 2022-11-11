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

export default StudentDashboard;
