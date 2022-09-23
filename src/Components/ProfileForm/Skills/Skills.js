import React, { useState } from "react";
import NextButton from "../../Items/NextButton";
import SkillsCategoryItem from "./SkillsCategoryItem";

const Skills = () => {
    const [loading, setLoading] = useState(false)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "30em",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "3em",
      }}
    >
      <h2>Skill Set</h2>
      <div style={{ position: "relative", width: "80%" }}>
        <SkillsCategoryItem skillType={"Coding Skills"} endpoint={"/student/profile/skills/search"}/>
        <SkillsCategoryItem skillType={"Interpersonal Skills"} endpoint={"/student/profile/softskills/search"}/>
        <SkillsCategoryItem skillType={"Languages"} endpoint={"/student/profile/languages/search"} />
      <NextButton disable={loading} styleProp={{ width: "48%",marginLeft:"52%" }} />
    </div>
    </div>
  );
};

export default Skills;
