import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import "./StudentListBody.css";
import Check from "../Check";
import StudentItem from "./StudentItem";

const CompanyStudentListBody = () => {
  const shortlistedData = [
    "Ankush Kumar",
    "Monish Basaniwal",
    "Ashutosh Kumar",
    "Nanditha C P",
  ];
  const appliedData = [
    "Ramesh",
    "Suresh",
    "Mahesh",
    "Rajesh",
    "Brajesh",
    "Rakesh",
  ];
  const [studentType, setStudentType] = useState(true);
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
        {studentType
          ? shortlistedData.map((item, index) => {
              return <StudentItem key={index} item={item} />;
            })
          : appliedData.map((item, index) => {
              return <StudentItem key={index} item={item} />;
            })}
      </div>
    </div>
  );
};

export default CompanyStudentListBody;
