import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api";
import SkillItem from "../../Items/SkillItem";
import SkillsCategoryItem from "../../ProfileForm/Skills/SkillsCategoryItem";
import UpdateResumeModal from "../../UpdateResumeModal";

const ResumeSkillCategoryItem = ({
  skillType,
  endpoint,
  data,
  setData,
  showModal,
}) => {
  const [childOpen, setChildOpen] = useState(false);
  let profileData = data;
  const handleClick = () => {
    setChildOpen(true);
  };
  const handleSubmit = async (skillType, endpoint, skills) => {
    try {
      if (skillType === "Coding Skills") {
        await api.post(`${endpoint}`, {
          skills: skills,
        });
      } else if (skillType === "Interpersonal Skills") {
        await api.post(`${endpoint}`, {
          softSkills: skills,
        });
      } else {
        await api.post(`${endpoint}`, {
          languages: skills,
        });
      }
      toast.success("Data saved!");
      setData(skills);
      setChildOpen(false);
      return false;
    } catch (error) {
      toast.error("Server Error!");
      return true;
    }
  };
  return (
    <>
      <UpdateResumeModal
        open={childOpen}
        setOpen={setChildOpen}
        component={
          <SkillsCategoryItem
            skillType={skillType}
            endpoint={endpoint}
            profileData={profileData}
            handleSubmit={handleSubmit}
          />
        }
      />
      {profileData.map((skill) => (
        <SkillItem
          key={skill._id}
          skill={skill}
          disableBut={true}
          onDelete={() => {}}
          skillStyle={{ width: "100%" }}
        />
      ))}
      {showModal && <button onClick={handleClick}>Edit</button>}
    </>
  );
};

export default ResumeSkillCategoryItem;
