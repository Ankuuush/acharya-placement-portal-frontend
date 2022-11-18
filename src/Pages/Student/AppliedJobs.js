import React, { useEffect, useState } from "react";
import Search from "../../Components/Search/Search";
import Filter from "../../Components/Filter/Filter";
import JobItem from "../../Containers/Jobitem/Jobitem";
import Spinner from "../../Components/Spinner/Spinner";

const AppliedJobs = () => {
  const [drives, setDrives] = useState([
    {
      files: [],
      _id: "6360b5c5c38471948640fd07",
      role: "Full Stack Developer",
      createdOn: 1667282016395,
      jobType: "full-time",
      jd: "Development of large scale projects and products for some of the top organizations across several countries.Assisting the development heads and leads with all aspects of software design and coding. \n Attending and contributing to company development meetings. \n Monitoring the technical performance of internal systems.Development of large scale projects and products for some of the top organizations across several countries.Assisting the development heads and leads with all aspects of software design and coding. Attending and contributing to company development meetings. Monitoring the technical performance of internal systems.",
      ctc: 600000,
      regitrationDeadline: "2022-09-24T18:30:00.000Z",
      eligibility: {
        age: 21,
        tenthPercentage: 32,
        graduationPercentage: 72.5,
        skills: [],
        softSkills: [],
        languages: [],
      },
      noOfPositions: 10,
      bondApplicable: true,
      bondDuration: 3,
      bondStatement:
        "Pay the company 5,00,000 in case of failure to adhering to the bond",
      location: "Hyderabad",
      venue: "MBA Seminar Hall",
      additionalInfo: "Applicants must be attentive and smart",
      locked: false,
      createdBy: "PburSZVOSvNAOWSphCWbHBprfWI3",
      department: "BEIS",
      slug: "full-stack-developer",
      __v: 0,
      company: {
        _id: "6360b46cc38471948640fcfb",
        name: "Infosys",
        createdOn: 1667282016394,
        external_id: null,
        reviews: [],
        questions: [],
        processed: false,
        logoUrl:
          "https://professionallyspeaking.net/wp-content/uploads/2017/04/infosys-logo.jpg",
        website: "https://infosys.com",
        slug: "infosys",
        __v: 0,
      },
    },
  ]);
  const [searchDrives, setSearchDrives] = useState(drives)
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(true);

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
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner />
          </div>
        ) : (searchDrives.length>0?
          searchDrives.map((job, index) => (
            <JobItem key={index} job={job} text={"Selected"} />
          )):<h3 style={{textAlign:"center",marginTop:"2rem"}}>No drive found!!</h3>
        )}
      </div>
      {filterOpen && <Filter />}
    </div>
  );
};

export default AppliedJobs;
