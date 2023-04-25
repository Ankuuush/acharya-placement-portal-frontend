import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";
import DriveHeaderTPO from "./DriveHeaderTPO";
import DriveBodyTPO from "./DriveBodyTPO";

const DriveDetailsTPO = ({job,company,skillData,details}) => {

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
      <div>
        {/* implement back button */}
        {/* <div
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
        </div> */}
        <div style={driveStyle}>
          <DriveHeaderTPO
            job={job}
            company={company}
            details={details}
          />
          <DriveBodyTPO job={job} skills={skillData} details={details} />
        </div>
      </div>
      // <h2>yo</h2>
  );
};

export default DriveDetailsTPO;
