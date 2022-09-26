import React, { useState } from "react";
import { useCallback } from "react";
import _debounce from "lodash/debounce";
import api from "../../../api";
import { Button, TextField } from "@mui/material";
import "../../../Styles/Skills.css";
import SkillItem from "./SkillItem";

const SkillsCategoryItem = (props) => {
  const {skillType,endpoint}=props
  const [value, setValue] = useState("");
  const [search, setSearch] = useState([]);
  const [skills, setSkills] = useState([])

  const addSkill=(e,element)=>{
    e.preventDefault();
    let newSkills=skills
    newSkills.push(element)
    setSkills(newSkills)
  }

  const debounceFn = useCallback(_debounce(handleDebounceFn, 500), []);

  function handleDebounceFn(inputValue) {
    if (inputValue.length >= 2) {
      try {
        api
          .get(`${endpoint}?q=${inputValue}`)
          .then((res) => {
            setSearch(res.data.data.skills);
            console.log(res.data.data.skills);
          });
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    } else setSearch([]);
  }

  const onChange = (event) => {
    setValue(event.target.value);
    debounceFn(event.target.value);
  };

  return (
    <div>
      <h4 style={{color:"#F49424"}}>{skillType}</h4>
      <TextField
        name="search"
        onChange={onChange}
        value={value}
        size="small"
        label="Enter Skill Name"
        type="search"
        variant="outlined"
        className="search"
        style={{ width: "100%" }}
      />

      {search.length > 0 && (
        <div className="autocomplete">
          {search.map((element) => (
            <div className="autocompleteItems" key={element._id} onClick={()=>addSkill(element)}>
              <p className="autocompleteItems-p">{element.name}</p>
            </div>
          ))}
        </div>
      )}
      <div style={{width:"100%",display:"grid",grid:"auto /auto auto auto auto",height:"100%",marginTop:"1rem"}}>
        {skills.map((skill)=><SkillItem skill={skill}/>)}
      </div>
      <Button
      disabled={skills.length==0}
        size="small"
        variant="contained"
        style={{
          position: "relative",
          margin: "1rem 20%",
          width: "60%",
          fontSize: "0.9rem",
          padding: "0.5rem",
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default SkillsCategoryItem;
