import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api";
import NextButton from "../../Items/NextButton";
import SkillsCategoryItem from "./SkillsCategoryItem";

const Skills = ({ profileData, activeStep, setActiveStep }) => {
  const [count, setCount] = useState(0);
  
  const handleSubmit = async (skillType,endpoint,reqBody) => {
    try {
      if (skillType === "Coding Skills") {
        await api.post(`${endpoint}`, {
          skills: reqBody,
        });
      } else if (skillType === "Interpersonal Skills") {
        await api.post(`${endpoint}`, {
          softSkills: reqBody,
        });
      } else {
        await api.post(`${endpoint}`, {
          languages: reqBody,
        });
      }
      toast.success("Data saved!");
      setCount(count + 1);
      return false
    } catch (error) {
      toast.error("Server Error!");
      return true
    }
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
      <h2>Skill Set</h2>
      <div style={{ position: "relative", width: "80%" }}>
        <SkillsCategoryItem
          skillType={"Coding Skills"}
          endpoint={"/student/profile/skills"}
          count={count}
          setCount={setCount}
          profileData={profileData}
          handleSubmit={handleSubmit}
        />
        <SkillsCategoryItem
          skillType={"Interpersonal Skills"}
          endpoint={"/student/profile/softskills"}
          count={count}
          setCount={setCount}
          profileData={profileData}
          handleSubmit={handleSubmit}
        />
        <SkillsCategoryItem
          skillType={"Languages"}
          endpoint={"/student/profile/languages"}
          count={count}
          setCount={setCount}
          profileData={profileData}
          handleSubmit={handleSubmit}
        />
        <NextButton
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          disable={count !== 3}
          styleProp={{ width: "48%", marginLeft: "52%" }}
        />
      </div>
    </div>
  );
};

export default Skills;
