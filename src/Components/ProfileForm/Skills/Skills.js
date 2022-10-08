import React, { useState } from "react";
import NextButton from "../../Items/NextButton";
import SkillsCategoryItem from "./SkillsCategoryItem";

const Skills = ({ profileData, activeStep, setActiveStep }) => {
  const [count, setCount] = useState(0);

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
        />
        <SkillsCategoryItem
          skillType={"Interpersonal Skills"}
          endpoint={"/student/profile/softskills"}
          count={count}
          setCount={setCount}
          profileData={profileData}
        />
        <SkillsCategoryItem
          skillType={"Languages"}
          endpoint={"/student/profile/languages"}
          count={count}
          setCount={setCount}
          profileData={profileData}
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
