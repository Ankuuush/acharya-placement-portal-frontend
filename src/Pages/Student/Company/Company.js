import React, { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../../Components/Spinner/Spinner";
import api from "../../../api";
import Badge from "../../../Components/Badge/Badge";
import JobItem from "../../../Containers/Jobitem/Jobitem";

const Company = ({toggleDriveBookmark, change}) => {
  const [company, setCompany] = useState(null);
  const [drives, setDrives] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { companySlug } = useParams();

  useEffect(() => {
    getCompany();
  }, []);

  function getCompany() {
    api
      .get("/student/drives/company/" + companySlug)
      .then((response) => {
        setCompany(response.data.data.company);
        setDrives(response.data.data.drives);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.error.message);
        setLoading(false);
      });
  }

  const navigate = useNavigate();
  const driveStyle = {
    padding: "25px 35px",
    borderRadius: "5px",
    backgroundColor: "white",
    borderTop: "10px solid #1f357e",
  };
  const buttonStyle = {
    padding: 0,
    border: "none",
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div style={{ textAlign: "center" }}>
          <img
            src="https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/website-assets/qIufhof.png"
            height={400}
          />
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 20,
              cursor: "pointer",
            }}
            onClick={handleBack}
          >
            <button style={buttonStyle}>
              <FeatherIcon
                icon={"arrow-left"}
                color="#213780"
                size={18}
                style={{ marginRight: 5 }}
              />
            </button>
            <p>Back</p>
          </div>
          <div style={driveStyle}>
          <div className="drive-header" style={{marginTop: 5}} onClick={()=> navigate("/student/company/" + company.slug)}>
          <img src={company.logoUrl} style={{height: 80,width: 80}} className="drive-logo" />
          <div className="drive-header-group">
            <h2 className="drive-company">{company.name}</h2>
            {company.website && <a href={company.website} target="_blank" style={{
        textDecoration: "none",
        color: "#20367f"
      }}>{company.website}</a>}
          </div>
        </div>
          </div>
          <div className="flex-boy" style={{marginTop: 25, padding: 10}}>
          <FeatherIcon icon={"briefcase"} size={20} style={{ marginRight: 5 }} />
          <h3 className="drive-company">Drives from this company</h3>
          <hr />
          </div>
          {drives? drives.map((drive) => {
            return (
              <JobItem
                key={drive._id}
                job={drive}
                company={company}
                style={{ marginTop: 10 }}
                removeCompanyHeader
                toggleDriveBookmark={toggleDriveBookmark}
                change={change}
                text="Apply Now"
              />
            );
          }): <div style={{textAlign: "center", marginTop: 20}}><p>No drives found</p></div> }
        </div>
      )}
    </>
  );
};

export default Company;
