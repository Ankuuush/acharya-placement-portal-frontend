import React, { useEffect, useState } from "react";
import Badge from "../../Components/Badge/Badge";
import FeatherIcon from "feather-icons-react";
import DriveHeader from "../../Components/DriveDetailsItem/DriveHeader";
import DriveBody from "../../Components/DriveDetailsItem/DriveBody";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import api from "../../api";

const DriveDetails = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const {driveid} = useParams();

  useEffect(() => {
    api.get("/student/drives/"+ driveid).then((response) => {
      setJob(response.data.data.drive);
      setLoading(false);
    });
  }, []);

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
    <>
    {loading ? <Spinner/> : <div style={driveStyle}>
      <button style={buttonStyle} onClick={handleBack}><FeatherIcon icon={"arrow-left-circle"} color="#213780" size={"2rem"}/></button>
      <DriveHeader job={job}/>
      <DriveBody job={job} />
      </div>}
    </>
  );
};

export default DriveDetails;
