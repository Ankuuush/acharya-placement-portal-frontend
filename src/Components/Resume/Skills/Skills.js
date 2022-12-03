import React, { useState } from "react";
import Modal from "../../ModalComponent";
import ResumeSkillCategoryItem from "./SkillCategoryItem";
import FeatherIcon from "feather-icons-react";

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
      <h3 style={{color:"orange", paddingTop:"1.5rem"}}> Skills</h3>
      <div style={{display:"flex", flexDirection:"row"}}>
      <h4 style={{color:"orange", paddingTop:"1.5rem", paddingBottom:"0.7rem"}}> Coding Skills </h4>
      <div style={{paddingLeft:"52rem"}}>
      {!showModal && <FeatherIcon icon='edit-2' onClick={handleOpen} style={{cursor:"pointer"}} />}
      </div></div>
      <div style={{display:"flex", flexDirection:"row", }}>
      <ResumeSkillCategoryItem
        skillType={"Coding Skills"}
        endpoint={"/student/profile/skills"}
        data={skills}
        setData={setSkills}
        showModal={showModal}
        
      /></div>
      
      
      <h4 style={{color:"orange", paddingTop:"1.5rem", paddingBottom:"0.7rem"}}> Interpersonal Skills </h4>
      <ResumeSkillCategoryItem
        skillType={"Interpersonal Skills"}
        endpoint={"/student/profile/softskills"}
        data={softSkills}
        setData={setSoftSkills}
        showModal={showModal}
      />
      <h4 style={{color:"orange", paddingTop:"1.5rem", paddingBottom:"0.7rem"}}> Languages </h4>
      <ResumeSkillCategoryItem
        skillType={"Languages"}
        endpoint={"/student/profile/languages"}
        data={languages}
        setData={setLanguages}
        showModal={showModal}
      />
      
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
