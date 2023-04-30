import React, { useEffect, useState } from "react";
import api from "../../api";
import JobDashboard from "../../Components/JobDashboard/JobDashboard";

const TpoExploreJobs = ({ change, toggleDriveBookmark }) => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchDrives, setSearchDrives] = useState([]);
  const [filterDrives, setFilterDrives] = useState([]);

  useEffect(() => {
    getAllDrives();
    const interval=setInterval(() => {
      getAllDrives();
    }, 10000);

    return ()=>{
      return clearInterval(interval)
    }
  }, []);

  const getAllDrives = () => {
    api.get("/tpo/drives").then((response) => {
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
      text="View Details"
      view="tpo"
    />
  );
};

export default TpoExploreJobs