import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api";
import Modal from "../../ModalComponent";
import EducationalDetailsItem from "../../ProfileForm/EducationalDetails/educationalDetailsItem";
import "../index.css"

const ResumeEducationDetailsItem = ({ text, data, setData, showModal }) => {
  const [childOpen, setChildOpen] = useState(false);
  const [educationalInfo, setEducationalInfo] = useState(data);
  const handleClick = () => {
    setChildOpen(true);
  };
  const handleSubmit = async () => {
    const response = await api
      .post(`student/profile/education/${text}`, {
        institution: educationalInfo.institution,
        startYear: parseInt(educationalInfo.startYear),
        endYear: parseInt(educationalInfo.endYear),
        gradeScale: parseInt(educationalInfo.gradeScale),
        grade: parseFloat(educationalInfo.grade),
      })
      .then((response) => {
        setData(response.data.data.profile.educationDetails);
        toast.success("Data saved!");
        setChildOpen(false);
        return false;
      })
      .catch(() => {
        toast.error("Server Error!");
        return true;
      });
    return response;
  };
  return (
    <>
      <Modal
        open={childOpen}
        setOpen={setChildOpen}
        component={
          <EducationalDetailsItem
            educationalInfo={educationalInfo}
            setEducationalInfo={setEducationalInfo}
            handleSubmit={handleSubmit}
            disableForm={false}
          />
        }
      />
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
      <div>
      <div style={{color: "#737373", marginTop: 10}}>Institution: <span style={{color: "black"}}>{data.institution}</span></div>
      <div style={{color: "#737373", marginTop: 10}}>Start Year: <span style={{color: "black"}}>{data.startYear}</span></div>
      <div style={{color: "#737373", marginTop: 10}}>Completion Year: <span style={{color: "black"}}>{data.endYear}</span></div>
      <div style={{color: "#737373", marginTop: 10}}>Grade: <span style={{color: "black"}}>{data.grade}{data.gradeScale === 100 ? "%" : " CGPA"}</span></div>
      </div>
      {showModal && <button onClick={handleClick} className="section_edit_btn">✎ Edit</button>}
      </div>
      {showModal && <hr className="job-hr" />}
    </>
  );
};

export default ResumeEducationDetailsItem;
