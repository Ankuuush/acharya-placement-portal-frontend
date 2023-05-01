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
  const [shortlistedData, setShortlistedData] = useState([]);
  const [appliedData, setAppliedData] = useState([]);
  const [drive, setDrive] = useState(null);
  const [studentType, setStudentType] = useState(true);
  const { driveid } = useParams();
  console.log(driveid);
  useEffect(() => {
    api
      .get(`/tpo/drives/${driveid}/applications`)
      .then((res) => {
        console.log(res.data);
        setAppliedData(res.data.data.applications);
        setDrive(res.data.data.drive);
      })
      .catch(() => {
        toast.error("Server error!!");
      });
    api
      .post(`tpo/drives/${driveid}/eligibleStudents`)
      .then((res) => {
        console.log(res.data);
        setShortlistedData(res.data.data.students);
      })
      .catch(() => {
        toast.error("Server error!!");
      });
  }, []);

  const checkedStyle = {
    color: "#1E4786",
    textDecoration: "underline",
    textDecorationColor: "#1E4786",
    textDecorationThickness: "2px",
    textUnderlineOffset: "5px",
    cursor: "pointer",
  };

  const unCheckedStyle = {
    color: "rgba(0, 0, 0, 0.51)",
    cursor: "pointer",
  };

  const downloadFilterExcel = () => {
    api.post("/tpo/drives/"+driveid+"/eligibleStudents?file=true",{}, { responseType: 'arraybuffer' }).then((res) => {
      console.log(res.data);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", drive.company.name.replaceAll(" ","-")+"-shortlisted-students.xlsx");
      document.body.appendChild(link);
      link.click();
    })
  }

  return (
    <div>
      {drive && (
        <div
          style={{
            background: "white",
            padding: 15,
            borderRadius: 10,
            marginTop: 15,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={drive.company.logoUrl}
              alt="logo"
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                marginRight: 15,
              }}
            />
            <p className="search-header" style={{ fontSize: 19 }}>
              {drive.company.name} - {drive.role}
            </p>
          </div>
        </div>
      )}
      <div className="student-list">
        <div className="student-list-main-header">
          <h4
            onClick={() => setStudentType(true)}
            style={
              studentType
                ? { ...checkedStyle, marginRight: "2rem" }
                : { ...unCheckedStyle, marginRight: "2rem" }
            }
          >
            Eligible Students
          </h4>
          <h4
            onClick={() => setStudentType(false)}
            style={studentType ? unCheckedStyle : checkedStyle}
          >
            Applied Students
          </h4>
        </div>
        <div className="student-list-main-body">
          <div style={{width: "100%", justifyContent: "space-between", display: "flex", textAlign: "center", alignItems: "center", justifyItems: "center", display: "flex"}}>
            <p></p>
          <button style={{border: "none", color: "white", background: "#23903c", padding: "15px 15px", borderRadius: 5, fontSize: 16, fontWeight: "bolder", marginTop: 10, marginBottom: 10, marginRight: 15}} onClick={downloadFilterExcel}>Download As Excel</button>
          </div>
          {studentType
            ? shortlistedData.map((item, index) => {
                return <StudentItem key={index} student={item} />;
              })
            : appliedData.map((item, index) => {
                return <StudentItem key={index} student={item} />;
              })}
        </div>
      </div>
    </div>
  );
};

export default CompanyStudentListBody;
