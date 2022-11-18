import React from "react";
import Badge from "../../Components/Badge/Badge";
import FeatherIcon from "feather-icons-react";
import DriveHeader from "../../Components/DriveDetailsItem/DriveHeader";
import DriveBody from "../../Components/DriveDetailsItem/DriveBody";
import { useLocation, useNavigate } from "react-router-dom";

const DriveDetails = () => {
    const {state}=useLocation();
    const {job}=state
    const navigate=useNavigate()
    const driveStyle={
      padding: "15px 20px",
      borderRadius: "5px",
      backgroundColor: "white"
    }
    const buttonStyle={
      padding:0,
      backgroundColor:"white",
      border:"none",
      width:"2rem",
      height:"2rem",
      borderRadius:"1rem"
    }

    const handleBack=()=>{
      navigate(-1);
    }
  return (
    <div style={driveStyle}>
      <button style={buttonStyle} onClick={handleBack}><FeatherIcon icon={"arrow-left-circle"} color="#213780" size={"2rem"}/></button>
      <DriveHeader job={job}/>
      <DriveBody job={job} />
      </div>
  );
};

export default DriveDetails;
