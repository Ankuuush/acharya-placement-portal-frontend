import React, { useState } from 'react'
import SkillItem from "../../Items/SkillItem";
import { toast } from "react-toastify";
import { TextField } from '@mui/material';
import { useCallback } from "react";
import _debounce from "lodash/debounce";
import api from "../../../api";
import { useEffect } from 'react';

const SkillsSearch = ({endpoint, disableBut,skills,setSkills,skillType}) => {
    const [value, setValue] = useState("");
  const [search, setSearch] = useState([]);
    const addSkill = (element) => {
        for (let index = 0; index < skills.length; index++) {
          if (skills[index]._id === element._id) {
            toast.error("Skill already added!");
            return;
          }
        }
        setSkills([...skills,element]);
        setValue("");
        setSearch([]);
      };

    const debounceFn = useCallback(_debounce(handleDebounceFn, 500), []);

    function handleDebounceFn(inputValue) {
      if (inputValue.length >= 2) {
        try {
          api.get(`${endpoint}/search?q=${inputValue}`).then((res) => {
            let response = [];
            if (skillType === "Coding Skills") response = res.data.data.skills;
            else if (skillType === "Interpersonal Skills")
              response = res.data.data.softSkills;
            else response = res.data.data.languages;
            setSearch(response);
          });
        } catch (error) {
          toast.error("Server Error!");
        }
      } else setSearch([]);
    }
  
    const onChange = (event) => {
      setValue(event.target.value);
      debounceFn(event.target.value);
    };
    const onDelete = (id) => {
        let newskills = skills.filter((skill) => skill._id !== id);
        setSkills(newskills);
      };
      useEffect(() => {
       console.log(skills)
      }, [skills])
      
  return (
    <div>
        <TextField
        disabled={disableBut}
        name="search"
        onChange={onChange}
        value={value}
        size="small"
        label="Start typing to search..."
        type="search"
        variant="outlined"
        className="search"
        style={{ width: "100%" ,marginTop: 20 }}
      />

      {search.length > 0 && (
        <div className="autocomplete">
          {search.map((element) => (
            <div
              className="autocompleteItems"
              key={element._id}
              onClick={() => addSkill(element)}
            >
              <p className="autocompleteItems-p">{element.name}</p>
            </div>
          ))}
        </div>
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          marginTop: "0.5rem",
          marginBottom:"1rem"
        }}
      >
        {skills.map((skill) => (
          <SkillItem
            key={skill._id}
            skill={skill}
            disableBut={disableBut}
            onDelete={onDelete}
            skillStyle={{ width: "70%" }}
          />
        ))}
      </div>
    </div>
  )
}

export default SkillsSearch