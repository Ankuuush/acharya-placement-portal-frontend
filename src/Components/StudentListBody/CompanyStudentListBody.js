import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import "./StudentListBody.css";
import Check from "../Check";
import StudentItem from "./StudentItem";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import Checkbox from "@mui/material/Checkbox";
import Modal from "../ModalComponent";
import AuthContext from "../../Context/AuthContext/AuthContext";

const CompanyStudentListBody = () => {
  const [shortlistedData, setShortlistedData] = useState([]);
  const [appliedData, setAppliedData] = useState([]);
  const [drive, setDrive] = useState(null);
  const [studentType, setStudentType] = useState(true);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [addResult, setAddResult] = useState(null);
  const [open, setOpen] = useState(false);
  const { driveid } = useParams();

  const toggleSelectStudent = (id) => {
    if (selectedStudents.indexOf(id) === -1) {
      setSelectedStudents([...selectedStudents, id]);
    } else {
      setSelectedStudents(selectedStudents.filter((item) => item !== id));
    }
  };

  const context=useContext(AuthContext)
  const {token}=context

  useEffect(() => {
    getAppliedStudents();
    api
      .post(`${token.account}/drives/${driveid}/eligibleStudents`)
      .then((res) => {
        console.log(res.data);
        setShortlistedData(res.data.data.students);
      })
      .catch(() => {
        toast.error("Server error!!");
      });
  }, []);

  const getAppliedStudents = () => {
    api
    .get(`${token.account}/drives/${driveid}/applications`)
    .then((res) => {
      console.log(res.data);
      setAppliedData(res.data.data.applications);
      setDrive(res.data.data.drive);
    })
    .catch(() => {
      toast.error("Server error!!");
    });
  }

  const closeModal = () => {
    setAddResult(null);
    setOpen(false);
  }

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
    api
      .post(
        "/tpo/drives/" + driveid + "/eligibleStudents?file=true",
        {},
        { responseType: "arraybuffer" }
      )
      .then((res) => {
        console.log(res.data);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          drive.company.name.replaceAll(" ", "-") + "-shortlisted-students.xlsx"
        );
        document.body.appendChild(link);
        link.click();
      });
  };

  const addStudentsToDrive = () => {
    api
      .post(`/tpo/addStudentsToDrive`, {
        driveId: driveid,
        students: selectedStudents,
      })
      .then((res) => {
        getAppliedStudents();
        setAddResult(res.data.data.applications);
        toast.success("Students added successfully!!");
      })
      .catch(() => {
        toast.error("Server error!!");
      });
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
          <div
            style={{
              width: "100%",
              justifyContent: "space-between",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyItems: "center",
              display: "flex",
            }}
          >
            <div>
              {/* <Checkbox onChange={(e) => {
            if(e.target.checked) {
              setSelectedStudents(shortlistedData.map((item) => item.id));
            } else {
              setSelectedStudents([]);
            }
          }} />
          <span style={{fontSize: 16, paddingTop: 10}}>Select All</span> */}
              <Modal open={open} setOpen={closeModal} height={"50vh"} component={<div>
                <h3>Adding students to applied</h3>
                <p style={{marginTop: 5}}>Are you sure you want to add {selectedStudents.length} students to applied? If they have already applied, no action will be performed</p>
                <div style={{marginTop: 25, display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
                {!addResult && selectedStudents.map((item) => (
                  <div style={{display: "flex", alignItems: "center", marginBottom: 20, marginRight: 15, width: "35%"}}>
                    <img src={shortlistedData.find((student) => student.student._id === item).profile.basicDetails.photoUrl} alt="profile" style={{width: 50, height: 50, borderRadius: 1000, marginRight: 10}} />
                    <h4 style={{fontSize: 16}}>{shortlistedData.find((student) => student.student._id === item).student.firstName} {shortlistedData.find((student) => student.student._id === item).student.lastName}</h4>
                    </div>
                ))}
                {addResult && <div>
                  <h4 style={{fontSize: 16}}>{addResult.nUpserted} Students added successfully</h4>
                  <h4 style={{fontSize: 16}}>{addResult.nMatched} Students already applied</h4>
                  </div>}
                  </div>
                  <button style={{
                    border: "none",
                    color: "white",
                    background: "#E87C25",
                    padding: "15px 15px",
                    borderRadius: 5,
                    fontSize: 16,
                    fontWeight: "bolder",
                    marginTop: 20,
                    marginBottom: 10,
                    width: "50%",
                  }} onClick={addStudentsToDrive}>Add Students</button>
              </div>} />

              {selectedStudents.length > 0 && studentType && (
                <button
                  style={{
                    border: "none",
                    color: "white",
                    background: "#E87C25",
                    padding: "5px 15px",
                    borderRadius: 5,
                    fontSize: 16,
                    fontWeight: "bolder",
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 15,
                  }}
                  onClick={()=>setOpen(!open)}
                >
                  Add students to applied
                </button>
              )}
            </div>
            {studentType &&<button
              style={{
                border: "none",
                color: "white",
                background: "#23903c",
                padding: "15px 15px",
                borderRadius: 5,
                fontSize: 16,
                fontWeight: "bolder",
                marginTop: 10,
                marginBottom: 10,
                marginRight: 15,
              }}
              onClick={downloadFilterExcel}
            >
              Download As Excel
            </button>}
          </div>
          {studentType
            ? shortlistedData.map((item, index) => {
                return (
                  <StudentItem
                    key={index}
                    student={item}
                    from="eligible"
                    selectedStudents={selectedStudents}
                    toggleSelectStudent={toggleSelectStudent}
                  />
                );
              })
            : appliedData.map((item, index) => {
                return (
                  <StudentItem key={index} student={item} from="applied" />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default CompanyStudentListBody;
