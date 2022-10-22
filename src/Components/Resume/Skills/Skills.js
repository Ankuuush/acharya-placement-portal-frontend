import React, { useState } from "react";
import UpdateResumeModal from "../../UpdateResumeModal";
import ResumeSkillCategoryItem from "./SkillCategoryItem";

const SkillsComponent = ({
  skills,
  setSkills,
  softSkills,
  setSoftSkills,
  languages,
  setLanguages,
  showModal,
  setOpen,
}) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <h3>Skills</h3>
      <h5> Coding Skills </h5>
      <ResumeSkillCategoryItem
        skillType={"Coding Skills"}
        endpoint={"/student/profile/skills"}
        data={skills}
        setData={setSkills}
        showModal={showModal}
      />
      <h5> Interpersonal Skills </h5>
      <ResumeSkillCategoryItem
        skillType={"Interpersonal Skills"}
        endpoint={"/student/profile/softskills"}
        data={softSkills}
        setData={setSoftSkills}
        showModal={showModal}
      />
      <h5> Languages </h5>
      <ResumeSkillCategoryItem
        skillType={"Languages"}
        endpoint={"/student/profile/languages"}
        data={languages}
        setData={setLanguages}
        showModal={showModal}
      />
      {!showModal && <button onClick={handleOpen}>Edit</button>}
    </div>
  );
};

const Skills = ({
  skills,
  setSkills,
  softSkills,
  setSoftSkills,
  languages,
  setLanguages,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <UpdateResumeModal
        open={open}
        setOpen={setOpen}
        component={
          <SkillsComponent
            skills={skills}
            setSkills={setSkills}
            softSkills={softSkills}
            setSoftSkills={setSoftSkills}
            languages={languages}
            setLanguages={setLanguages}
            showModal={true}
            setOpen={setOpen}
          />
        }
      />
      <SkillsComponent
        skills={skills}
        setSkills={setSkills}
        softSkills={softSkills}
        setSoftSkills={setSoftSkills}
        languages={languages}
        setLanguages={setLanguages}
        showModal={false}
        setOpen={setOpen}
      />
    </>
  );
};

export default Skills;
