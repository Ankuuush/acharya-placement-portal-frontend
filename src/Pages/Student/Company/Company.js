import React, { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../../Components/Spinner/Spinner";
import api from "../../../api";
import Badge from "../../../Components/Badge/Badge";
import JobItem from "../../../Containers/Jobitem/Jobitem";
import Rating from '@mui/material/Rating';

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
            <div
              className="drive-header"
              style={{ marginTop: 5 }}
              onClick={() => navigate("/student/company/" + company.slug)}
            >
              <img
                src={company.logoUrl}
                style={{ height: 80, width: 80 }}
                className="drive-logo"
              />
              <div className="drive-header-group">
                <h2 className="drive-company">{company.name}</h2>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "#20367f",
                    }}
                  >
                    {company.website}
                  </a>
                )}
                {company.rating && (<div>
                  <div style={{display: "flex", alignItems: "center", marginTop: 5}}>
                  <Rating name="read-only" value={company.rating} readOnly precision={0.1} />
                  <p style={{marginLeft: 10}}>{company.rating}/5</p>
                </div>
                <p style={{padding: 3}}>Based on {company.reviews.length} reviews</p>
                </div>)}
              </div>
            </div>
            {company.pros && company.cons && company.pros.length > 0 && company.cons.length > 0 && <div style={{display: "flex", width: "100%"}}>
              <div style={{flex: 1, border: "2px solid #88D096", borderRadius: 5, padding: 10, background: "#DFF7E7", marginRight: 20}}>
              <p className="drive-description" style={{color: "#49b65f", fontWeight: "bold", marginBottom: 10}}>Positive Reviews</p>
              { company.pros.sort(() => Math.random() - Math.random()).slice(0, 3)
                .map((pro) => {
                  return (
                    <p className="drive-description">"{pro}"</p>
                  );
                }
                )}
              </div>
              <div style={{flex: 1, border: "2px solid #EE9B93", borderRadius: 5, padding: 10, background: "#FFF2F2", marginRight: 20}}>
              <p className="drive-description" style={{color: "#e35b4f", fontWeight: "bold", marginBottom: 10}}>Negative Reviews</p>
              { company.cons.sort(() => Math.random() - Math.random()).slice(0, 3)
                .map((con) => {
                  return (
                    <p className="drive-description">"{con}"</p>
                  );
                }
                )}
              </div>
            </div>}
          </div>
          <div className="flex-boy" style={{ marginTop: 25, padding: 10 }}>
            <FeatherIcon
              icon={"briefcase"}
              size={20}
              style={{ marginRight: 5 }}
            />
            <h3 className="drive-company">Drives from this company</h3>
            <hr />
          </div>
          {drives && drives.length > 0 ? (
            drives.map((drive) => {
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
            })
          ) : (
            <div style={{ textAlign: "center", marginTop: 20, backgroundColor: "white", borderRadius: 10, padding: 15 }}>
              <p>No drives found</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Company;
