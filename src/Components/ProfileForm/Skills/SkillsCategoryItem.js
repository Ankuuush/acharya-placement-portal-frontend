import React, { useState } from "react";
import { Button } from "@mui/material";
import "../../../Styles/Skills.css";
import { useEffect } from "react";
import SkillsSearch from "./SkillsSearch";

const SkillsCategoryItem = ({
  skillType = "",
  endpoint = "",
  count = -1,
  setCount = (e) => {},
  profileData = "",
  handleSubmit = "",
}) => {
  
  const [skills, setSkills] = useState([]);
  const [disableBut, setDisableBut] = useState(false);
  

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisableBut(true);
    // let reqBody = [];
    // skills.forEach((skill) => reqBody.push(skill._id));
    if (await handleSubmit(skillType, endpoint, skills)) setDisableBut(false);
  };

  

  useEffect(() => {
    if (profileData.length) {
      setSkills(profileData);
      if (count > -1) {
        setDisableBut(true);
        setCount(count + 1);
      }
    }
  }, []);

  return (
    <div style={{width:"100%"}}>
      <h4 style={{ color: "#F49424" }}>{skillType}</h4>
      <SkillsSearch endpoint={endpoint} disableBut={disableBut} skills={skills} setSkills={setSkills} skillType={skillType} />
      <Button
        onClick={onSubmit}
        disabled={skills.length === 0 || disableBut}
        size="small"
        variant="contained"
        color="warning"
        style={{
          position: "relative",
          margin: "1rem 20%",
          width: "60%",
          fontSize: "0.9rem",
          padding: "0.5rem",
          marginTop: 30
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default SkillsCategoryItem;
