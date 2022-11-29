import React, { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import DriveHeader from "../../Components/DriveDetailsItem/DriveHeader";
import DriveBody from "../../Components/DriveDetailsItem/DriveBody";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import api from "../../api";

const DriveDetails = ({toggleDriveBookmark}) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {driveid} = useParams();

  useEffect(() => {
    getSingleDrive();

    // setInterval(() => {
    //   getSingleDrive();
    // } , 10000);
  }, []);

  function getSingleDrive() {
    api.get("/student/drives/"+ driveid).then((response) => {
      setJob(response.data.data.drive);
      setLoading(false);
    }).catch((error) => {
      setError(error.response.data.error.message);
      setLoading(false);
    });
  }

    const navigate=useNavigate()
    const driveStyle={
      padding: "20px 25px",
      borderRadius: "5px",
      backgroundColor: "white",
      borderTop: "10px solid #1f357e",
      boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
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
    {loading ? <Spinner/> : error ? <div style={{textAlign: "center"}}>
      <img src="https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/website-assets/qIufhof.png" height={400} />
      <p>{error}</p>
    </div> 
    :<div>
     <div style={{display: "flex", alignItems: "center", marginBottom: 20, cursor: "pointer"}} onClick={handleBack}>
     <button style={buttonStyle}><FeatherIcon icon={"arrow-left"} color="#213780" size={18} style={{marginRight: 5}}/></button>
     <p>Back</p>
     </div>
    <div style={driveStyle} >
      <DriveHeader job={job} refreshJob={getSingleDrive} toggleDriveBookmark={toggleDriveBookmark}/>
      <DriveBody job={job} />
      </div>
      </div>}
    </>
  );
};

export default DriveDetails;
