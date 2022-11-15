import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api";
import NextButton from "../../Items/NextButton";
import EducationalDetailsItem from "./educationalDetailsItem";

const EducationalDetails = ({activeStep,setActiveStep}) => {
  const [count, setCount] = useState(0)
  const [tenthInfo, setTenthInfo] = useState({
    institution: "",
    startYear: "",
    endYear: "",
    gradeScale: "",
    grade: "",
  });
  const [twelththInfo, setTwelthInfo] = useState({
    institution: "",
    startYear: "",
    endYear: "",
    gradeScale: "",
    grade: "",
  });
  const [ugInfo, setUgInfo] = useState({
    institution: "",
    startYear: "",
    endYear: "",
    gradeScale: "",
    grade: "",
  });

  const handleSubmit = async (text,educationalInfo) => {
    const response=await api
    .post(`student/profile/education/${text}`, {
        institution: educationalInfo.institution,
        startYear: parseInt(educationalInfo.startYear),
        endYear: parseInt(educationalInfo.endYear),
        gradeScale: parseInt(educationalInfo.gradeScale),
        grade: parseFloat(educationalInfo.grade),
      })
      .then(() => {
        toast.success("Data saved!");
        setCount(count + 1);
        return false
      })
      .catch(() => {
        toast.error("Server Error!");
        return true;
      });
      return response
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "30em",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Educational Details</h2>

        <EducationalDetailsItem educationalInfo={tenthInfo} setEducationalInfo={setTenthInfo} handleSubmit={handleSubmit} text={"10th"}/>
        {/* <EducationalDetailsItem  educationalInfo={twelththInfo} setEducationalInfo={setTwelthInfo} handleSubmit={handleSubmit} text={"12th"} />
        <EducationalDetailsItem educationalInfo={ugInfo} setEducationalInfo={setUgInfo}  handleSubmit={handleSubmit} text={"graduation"}/>
        <NextButton setActiveStep={setActiveStep} activeStep={activeStep} disable={count!==3} styleProp={{width: "48%"}}/>  */}
    </div>
  );
};

export default EducationalDetails;
