import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import "./StudentListBody.css";
import Check from "../Check";
import StudentItem from "./StudentItem";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";

const CompanyStudentListBody = () => {
  const [shortlistedData, setShortlistedData] = useState([])
  const [appliedData, setAppliedData] = useState([])
  const [studentType, setStudentType] = useState(true);
  const {driveid}=useParams()
  console.log(driveid)
  useEffect(() => {
    api.get(`/tpo/drives/${driveid}/applications`).then((res)=>{
      console.log(res.data)
      setAppliedData(res.data.data.applications)
    }).catch(()=>{
      toast.error("Server error!!")
    }
    )
    api.post(`tpo/drives/${driveid}/eligibleStudents`).then((res)=>{
      console.log(res.data)
      setShortlistedData(res.data.data.students)
    }).catch(()=>{
      toast.error("Server error!!")
    }
    )
  }, [])
  

  const checkedStyle = {
    color: "#1E4786",
    textDecoration: "underline",
    textDecorationColor: "#1E4786",
    textDecorationThickness:"2px",
    textUnderlineOffset: "5px",
    cursor:"pointer"
  };

  const unCheckedStyle = {
    color: "rgba(0, 0, 0, 0.51)",
    cursor:"pointer"
  };

  return (
    <div className="student-list">
      <div className="student-list-main-header">
        <h4
          onClick={() => setStudentType(true)}
          style={studentType ? {...checkedStyle,marginRight:"2rem"} : {...unCheckedStyle,marginRight:"2rem"}}
        >
          SHORTLISTED STUDENTS
        </h4>
        <h4
          onClick={() => setStudentType(false)}
          style={studentType ? unCheckedStyle : checkedStyle}
        >
          APPLIED STUDENTS
        </h4>
      </div>
      <hr />
      <div className="student-list-main-body">
        {
        studentType
          ? shortlistedData.map((item, index) => {
              return <StudentItem key={index} student={item} />;
            })
          : 
          appliedData.map((item, index) => {
              return <StudentItem key={index} student={item} />;
            })
            }
      </div>
    </div>
  );
};

export default CompanyStudentListBody;
