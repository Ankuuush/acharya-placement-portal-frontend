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
  const [filterDrives, setFilterDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(true);
  const [filterArray, setFilterArray] = useState([]);

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
      setFilterDrives(response.data.data.drives);
      setLoading(false);
    });
  }

  const setDriveData = (data) => {
    setSearchDrives(data);
    setFilterDrives(data)
    setLoading(false);
  };

  const assignLoading = (value) => {
    setLoading(value);
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const assignFilter = () => {
    let iniArr = [...searchDrives];
    let newArr = [];
    filterArray.forEach((item) => {
      let negArr = [];
      switch (item) {
        case "Remote":
          iniArr.forEach((item2) => {
            if (item2.location === item) newArr.push(item2);
            else negArr.push(item2);
          });
          break;
        case "On-Site":
          iniArr.forEach((item2) => {
            if (item2.location !== "Remote") newArr.push(item2);
            else negArr.push(item2);
          });
          break;
        case "full-time":
          iniArr.forEach((item2) => {
            if (item2.jobType === item) newArr.push(item2);
            else negArr.push(item2);
          });
          break;
        case "Internship":
          iniArr.forEach((item2) => {
            if (item2.jobType === item) newArr.push(item2);
            else negArr.push(item2);
          });
          break;
        default:
          iniArr.forEach((item2) => {
            if (item2.ctc <= item[1] && item2.ctc>= item[0]){
               newArr.push(item2);
            }
            else negArr.push(item2);
          });
          break;
      }
      iniArr=negArr
    });
    if(filterArray.length)
    {
      setFilterDrives(newArr);
    }
    else
    setFilterDrives(searchDrives)
  };


  useEffect(() => {
    assignFilter()
  }, [filterArray,searchDrives])
  

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
          assignFilter={assignFilter}
        />
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner />
          </div>
        ) : filterDrives.length > 0 ? (
          filterDrives.map((job, index) => (
            <JobItem key={index} job={job} text={"Apply Now"} change={change} toggleDriveBookmark={toggleDriveBookmark} getAllDrives={getAllDrives} />
          ))
        ) : (
          <h3 style={{ textAlign: "center", marginTop: "2rem" }}>
            No drive found!!
          </h3>
        )}
      </div>
      {filterOpen && (
        <Filter
          assignFilter={assignFilter}
          filterArray={filterArray}
          setFilterArray={setFilterArray}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
