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
    padding: "25px 35px",
    borderRadius: "5px",
    backgroundColor: "white",
    borderTop: "10px solid #1f357e",
    boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
  };
  const buttonStyle = {
    padding: 0,
    border: "none",
    background: "rgb(243, 244, 248)"
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
              background: "rgb(243, 244, 248)"
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
             <div style={{display: "flex"}}>
             <Badge
              icon={"hash"}
              text={job._id}
              color="#e67300"
              backgroundColor="#fff2e6"
            />
             <Badge
              icon={"check"}
              text={job.status === "applied" ? "Applied" : job.status === "rejected" ? "Rejected": "Selected"}
              color={job.status === "applied" ? "#20781f" : job.status === "rejected" ? "#da5885": "#20781f"}
              backgroundColor={job.status === "applied" ? "#e7fce8" : job.status === "rejected" ? "#fbeff5": "#e7fce8"}
            />
             </div>
            </div>
            <div style={{marginTop: 30}}>
            <div className="flex-tie">
            <div className="eligibility-param-check">
                      <FeatherIcon icon="check" size={15} color="#064709" />
            </div>
            <p>You have successfully applied to this drive on <b>{new Date(job.appliedOn).toLocaleString("en-in", {
                month: "short",
                year: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}</b></p>
            </div>
            <div style={{marginTop: 40}}>
            <h3>Application Progress</h3>
            <p style={{marginTop: 20}}>There is no round data available yet.You will be notified of any changes.</p>
            </div>
            <hr className="job-hr" />
            <div style={{marginTop: 40}}>
            <h3>Answered Questions</h3>
            {!job.answers && <p style={{marginTop: 20}}>There are no questions associated to this drive.</p>}

            <div style={{marginTop: 20}}>
            {job.answers && job.answers.map((answer, index) => (
              <div style={{marginTop: 25}}>
              <p style={{fontWeight: "bold"}}>{index + 1}. {answer.question}</p>
              <div style={{marginTop: 10}}>
              {answer.options ? answer.options.map((option, index) => (
                <p>{option}</p>
              )) : <p>{answer.answer}</p>}
              </div>
              </div>
            ))}
            </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Application;
