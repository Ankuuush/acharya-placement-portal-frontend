import React, { useEffect, useState } from "react";
import api from "../../api";
import JobDashboard from "../../Components/JobDashboard/JobDashboard";

const StudentDashboard = ({ change, toggleDriveBookmark }) => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchDrives, setSearchDrives] = useState([]);
  const [filterDrives, setFilterDrives] = useState([]);

  useEffect(() => {
    getAllDrives();

    setInterval(() => {
      getAllDrives();
    }, 10000);
  }, []);

  const getAllDrives = () => {
    api.get("/student/drives/all").then((response) => {
      setDrives(response.data.data.drives);
      setSearchDrives(response.data.data.drives);
      setFilterDrives(response.data.data.drives);
      setLoading(false);
    });
  };
  return (
    <JobDashboard
      drives={drives}
      loading={loading}
      setLoading={setLoading}
      searchDrives={searchDrives}
      setSearchDrives={setSearchDrives}
      filterDrives={filterDrives}
      setFilterDrives={setFilterDrives}
      change={change}
      toggleDriveBookmark={toggleDriveBookmark}
      getAllDrives={getAllDrives}
    />
  );
};

export default StudentDashboard;
