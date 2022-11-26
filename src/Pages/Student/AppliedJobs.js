import React, { useEffect, useState } from "react";
import Search from "../../Components/Search/Search";
import Filter from "../../Components/Filter/Filter";
import JobItem from "../../Containers/Jobitem/Jobitem";
import Spinner from "../../Components/Spinner/Spinner";
import api from "../../api";

const AppliedJobs = () => {
  const [drives, setDrives] = useState([]);
  const [searchDrives, setSearchDrives] = useState(drives)
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(true);


  useEffect(() => {
    getAppliedDrives();

    setInterval(() => {
      getAppliedDrives();
    }, 10000);
  }, []);

  const getAppliedDrives = () => {
    api.get("/student/drives/applied").then((response) => {
      setDrives(response.data.data.bookmarks);
      setSearchDrives(response.data.data.bookmarks);
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
        <Search
          data={drives} setDriveData={setDriveData} assignLoading={assignLoading} toggleFilter={toggleFilter} filter={filterOpen} loading={loading}
        />
        {/* {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner />
          </div>
        ) : (searchDrives.length>0?
          searchDrives.map((job, index) => (
            <JobItem key={index} job={job} text={"Selected"} />
          )):<h3 style={{textAlign:"center",marginTop:"2rem"}}>No drive found!!</h3>
        )} */}
      </div>
      {/* {filterOpen && <Filter />} */}
    </div>
  );
};

export default AppliedJobs;
