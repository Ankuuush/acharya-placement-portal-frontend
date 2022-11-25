import React, { useEffect, useState } from "react";
import api from "../../../api";
import JobDashboard from "../../../Components/JobDashboard/JobDashboard";

const SavedJobs = ({ change, toggleDriveBookmark }) => {
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
    api.get("/student/drives/bookmarks").then((response) => {
      setDrives(response.data.data.bookmarks);
      setSearchDrives(response.data.data.bookmarks);
      setFilterDrives(response.data.data.bookmarks);
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
      from="bookmarks"
    />
  );
};

export default SavedJobs;
