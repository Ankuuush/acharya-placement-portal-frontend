import React, { useEffect, useState } from "react";
import Search from "../../../Components/Search/Search";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import api from "../../../api";
import CompanyStudentList from "../../../Components/StudentListBody/CompanyStudentList";

const ShortlistedStudents = () => {
  console.log("abc");
  // const location=useLocation()
  // const {eligibilityData}=location.state
  // useEffect(() => {
  //   console.log(eligibilityData)
  //   // api.get('/tpo/eligibility/calculate',eligibilityData).then((response)=>{
  //   //     setStudents(response.data.data.students)
  //   //     console.log(response)
  //   // }).catch((error)=>{
  //   //     toast.error('Server Error')
  //   // })

  // }, [])
  return (
    <div
      style={{
        height: "auto",
        padding: "5px",
        display: "flex",
        backgroundColor: "#f3f4f8",
      }}
    >
      <div style={{ flex: "4", height: "fitContent" }}>
        <p className="search-header">Students List</p>
        <p>This is the list of students who are eligible for this drive</p>
        <CompanyStudentList />
      </div>
    </div>
  );
};

export default ShortlistedStudents;
