import React, { useEffect, useState } from "react";
import api from "../../api";
import Search from "../../Components/Search/Search";
import Filter from "../../Components/Filter/Filter";
import JobItem from "../../Containers/Jobitem/Jobitem";
import Spinner from "../../Components/Spinner/Spinner";
import "./index.css";

const StudentDashboard = ({ change, toggleDriveBookmark }) => {
  const [drives, setDrives] = useState([]);
  const [searchDrives, setSearchDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(true);

  useEffect(() => {
    getAllDrives();

    setInterval(() => {
      getAllDrives();
    }, 10000);

  }, []);

  function getAllDrives() {
    api.get("/student/drives/all").then((response) => {
      setDrives(response.data.data.drives);
      setSearchDrives(response.data.data.drives);
      setLoading(false);
    });
  }

  const setDriveData = (data) => {
    setSearchDrives(data);
    setLoading(false);
  };

  const assignLoading = (value) => {
    setLoading(value);
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="explore-root">
      <div className="left-job-root">
        <Search
          data={drives}
          setDriveData={setDriveData}
          assignLoading={assignLoading}
          toggleFilter={toggleFilter}
          filter={filterOpen}
          loading={loading}
        />
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner />
          </div>
        ) : searchDrives.length > 0 ? (
          searchDrives.map((job, index) => (
            <JobItem key={index} job={job} text={"Apply Now"} change={change} toggleDriveBookmark={toggleDriveBookmark} getAllDrives={getAllDrives} />
          ))
        ) : (
          <h3 style={{ textAlign: "center", marginTop: "2rem" }}>
            No drive found!!
          </h3>
        )}
      </div>
      {filterOpen && <Filter />}
    </div>
  );
};

export default StudentDashboard;
