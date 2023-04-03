import React from "react";
import { useEffect, useState } from "react";
import "./StudentListBody.css";
import StudentItem from "./StudentItem";
import api from "../../api";
import { toast } from "react-toastify";

const StudentListBody = () => {
  const [students,setStudents]=useState([])
  const headingStyle = {
    color: "#1E4786",
    textDecoration: "underline",
    textDecorationColor: "#1E4786",
    textDecorationThickness:"2px",
    textUnderlineOffset: "5px",
    cursor:"pointer"
  };

  useEffect(() => {
    api.get('/tpo/students').then((response)=>{
        setStudents(response.data.data.students)
    }).catch((error)=>{
        toast.error('Server Error')
    })
  
  }, [])
  

  return (
    <div className="student-list">
      <div className="student-list-main-header">
        <h4
          style={headingStyle} 
        >
          STUDENTS LIST
        </h4>
      </div>
      <hr />
      <div className="student-list-main-body">
        {students.map((item, index) => {
              return <StudentItem key={index} item={`${item.student.firstName} ${item.student.lastName}`} />;
            })
          }
      </div>
    </div>
  );
};

export default StudentListBody;
