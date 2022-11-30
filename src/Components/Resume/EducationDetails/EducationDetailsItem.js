import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api";
import Modal from "../../ModalComponent";
import EducationalDetailsItem from "../../ProfileForm/EducationalDetails/educationalDetailsItem";

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
      <div>{text}</div>
      
      <div style={{fontWeight:"600"}}>{data.institution}</div>
      <div style={{fontWeight:"600",color:"#696969"}}>{data.startyear}</div>
      <div style={{fontWeight:"600",color:"#696969"}}>{data.endYear}</div>
      <div style={{fontWeight:"600",color:"#696969"}}>{data.gradeScale}</div>
      <div style={{fontWeight:"600",color:"#696969"}}>{data.grade}</div>
      {showModal && <button onClick={handleClick}>Edit</button>}
    </>
  );
};

export default ResumeEducationDetailsItem;
