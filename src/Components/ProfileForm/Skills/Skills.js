import React, { useState } from "react";
import NextButton from "../../Items/NextButton";
import SkillsCategoryItem from "./SkillsCategoryItem";

const Skills = ({activeStep,setActiveStep}) => {
  const [count, setCount] = useState(0)

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
        <SkillsCategoryItem skillType={"Coding Skills"} endpoint={"/student/profile/skills/search"} count={count} setCount={setCount}/>
        <SkillsCategoryItem skillType={"Interpersonal Skills"} endpoint={"/student/profile/softskills/search"} count={count} setCount={setCount}/>
        <SkillsCategoryItem skillType={"Languages"} endpoint={"/student/profile/languages/search"} count={count} setCount={setCount}/>
      <NextButton setActiveStep={setActiveStep} activeStep={activeStep} disable={count!==3} styleProp={{width: "48%",marginLeft:"52%"}}/>
    </div>
    </div>
  );
};

export default Skills;
