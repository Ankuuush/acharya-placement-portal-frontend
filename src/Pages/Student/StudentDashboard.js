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
