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
      padding: "20px 25px",
      borderRadius: "5px",
      backgroundColor: "white",
      borderTop: "10px solid #1f357e",
      boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"
    }
    const buttonStyle={
      padding:0,
      border:"none"
    }

    const handleBack=()=>{
      navigate(-1);
    }
  return (
    <>
    {loading ? <Spinner/> : 
    <div>
     <div style={{display: "flex", alignItems: "center", marginBottom: 20, cursor: "pointer"}} onClick={handleBack}>
     <button style={buttonStyle}><FeatherIcon icon={"arrow-left"} color="#213780" size={18} style={{marginRight: 5}}/></button>
     <p>Back</p>
     </div>
    <div style={driveStyle} >
      <DriveHeader job={job}/>
      <DriveBody job={job} />
      </div>
      </div>}
    </>
  );
};

export default DriveDetails;
