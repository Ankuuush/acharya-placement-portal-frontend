import React from "react";
import { useEffect, useState } from "react";
import "./StudentListBody.css";
import StudentItem from "./StudentItem";
import api from "../../api";
import { toast } from "react-toastify";

const StudentListBody = ({students}) => {
  
  const headingStyle = {
    fontSize:"1.5rem",
    fontWeight:700,
    color: "#1E4786",
    textDecoration: "underline",
    textDecorationColor: "#1E4786",
    textDecorationThickness:"2px",
    textUnderlineOffset: "5px",
    cursor:"pointer"
  };
  

  return (
    <div className="student-list">
      <div className="student-list-main-header">
        <p
          style={headingStyle} 
        >
          STUDENTS LIST
        </p>
      </div>
      <hr />
      <div className="student-list-main-body">
        {students.map((student, index) => {
              return <StudentItem key={index} student={student} />;
            })
          }
      </div>
    </div>
  );
};

export default StudentListBody;
