import React, { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../../Components/Spinner/Spinner";
import api from "../../../api";
import Badge from "../../../Components/Badge/Badge";

const Application = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { applicationId } = useParams();

  useEffect(() => {
    getApplication();
  }, []);

  function getApplication() {
    api
      .get("/student/drives/applications/" + applicationId)
      .then((response) => {
        setJob(response.data.data.application);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.error.message);
        setLoading(false);
      });
  }

  const navigate = useNavigate();
  const driveStyle = {
    padding: "20px 25px",
    borderRadius: "5px",
    backgroundColor: "white",
    borderTop: "10px solid #1f357e",
    boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
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
            <div className="drive-header-root" style={{alignItems: "center"}}>
              <div className="drive-header">
                <img
                  src={job.drive.company.logoUrl}
                  height={60}
                  className="drive-logo"
                />
                <div className="drive-header-group">
                  <p className="drive-company">{job.drive.company.name}</p>
                  <p className="drive-role">{job.drive.role}</p>
                </div>
              </div>
              <Badge
              icon={"hash"}
              text={job._id}
              color="#e67300"
              backgroundColor="#fff2e6"
            />
            </div>
            <h3>gg</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default Application;
