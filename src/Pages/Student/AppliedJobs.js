import React, { useEffect, useState } from "react";
import AppliedItem from "../../Containers/Driveitem/Applieditem";
import Spinner from "../../Components/Spinner/Spinner";
import api from "../../api";
import "./index.css";

const AppliedJobs = ({ change }) => {
  const [drives, setDrives] = useState([]);
  const [searchDrives, setSearchDrives] = useState(drives);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(true);

  useEffect(() => {
    getAppliedDrives();

    const interval=setInterval(() => {
      getAppliedDrives();
    }, 10000);

    return ()=>{
      return clearInterval(interval)
    }
  }, []);

  const getAppliedDrives = () => {
    api.get("/student/drives/applied").then((response) => {
      setDrives(response.data.data.applications);
      setSearchDrives(response.data.data.applications);
      // setFilterDrives(response.data.data.bookmarks);
      setLoading(false);
    });
  };

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

  const styleAppliedRoot = {
    height: "auto",
    padding: "5px",
    display: "flex",
    backgroundColor: "#f3f4f8",
  };

  const styleLeftJobRoot = {
    flex: "4",
    height: "fitContent",
  };

  return (
    <div style={styleAppliedRoot}>
      <div style={styleLeftJobRoot}>
        <div
          className="search-root"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h4>Applied Drives</h4>
          <p>gg</p>
        </div>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner />
          </div>
        ) : searchDrives.length > 0 ? (
          <div className="applied-jobs-grid">
            {searchDrives.map((job, index) => (
              <AppliedItem
                key={index}
                job={job.drive}
                text={"Selected"}
                application={job}
                change={change}
              />
            ))}
            
          </div>
        ) : (
          <h3 style={{ textAlign: "center", marginTop: "2rem" }}>
            No applications found!!
          </h3>
        )}
      </div>
      {/* {filterOpen && <Filter />} */}
    </div>
  );
};

export default AppliedJobs;
