import React, { useState } from "react";
import Modal from "../../ModalComponent";
import ResumeSkillCategoryItem from "./SkillCategoryItem";
import FeatherIcon from "feather-icons-react";
import '../index.css';

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
      <div className="flex-tie">
      <div className="flex-tie margin-top-bottom">
          <FeatherIcon
            icon="box"
            color="#f69131"
            style={{ marginRight: 10 }}
          />
          <h4 className="section_title_resume">Skills</h4>
        </div>
        {!showModal && <FeatherIcon icon='edit-2' onClick={handleOpen} style={{cursor:"pointer"}} />}
      </div>

      <div>
      <h4 style={{color:"black", marginBottom:"10px", marginTop: 5}}> Technical Skills </h4></div>
      <ResumeSkillCategoryItem
        skillType={"Coding Skills"}
        endpoint={"/student/profile/skills"}
        data={skills}
        setData={setSkills}
        showModal={showModal}
        
      />
      
      
      <h4 style={{color:"black", marginBottom:"10px", marginTop: 30}}> Interpersonal Skills </h4>
      <ResumeSkillCategoryItem
        skillType={"Interpersonal Skills"}
        endpoint={"/student/profile/softskills"}
        data={softSkills}
        setData={setSoftSkills}
        showModal={showModal}
      />
      <h4 style={{color:"black", marginBottom:"10px", marginTop: 30}}> Languages </h4>
      <ResumeSkillCategoryItem
        skillType={"Languages"}
        endpoint={"/student/profile/languages"}
        data={languages}
        setData={setLanguages}
        showModal={showModal}
      />

<hr className="job-hr" />
      
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
      <Modal
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
