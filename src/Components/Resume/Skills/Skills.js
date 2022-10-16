import React from "react";
import SkillCategoryItem from "./SkillCategoryItem";

const Skills = ({ skills, softSkills, languages }) => {
  return (
    <div>
      <h3>Skills</h3>
      <h5> Coding Skills </h5>
      <SkillCategoryItem data={skills} />
      <h5> Interpersonal Skills </h5>
      <SkillCategoryItem data={softSkills} />
      <h5> Languages </h5>
      <SkillCategoryItem data={languages} />
    </div>
  );
};

export default Skills;
