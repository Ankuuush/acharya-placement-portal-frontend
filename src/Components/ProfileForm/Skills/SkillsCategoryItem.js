import React, { useState } from "react";
import { useCallback } from "react";
import _debounce from "lodash/debounce";
import api from "../../../api";
import { Button, TextField } from "@mui/material";
import "../../../Styles/Skills.css";
import SkillItem from "./SkillItem";
import { toast } from "react-toastify";

const SkillsCategoryItem = (props) => {
  const { skillType, endpoint, count, setCount } = props;
  const [value, setValue] = useState("");
  const [search, setSearch] = useState([]);
  const [skills, setSkills] = useState([]);
  const [disableBut, setDisableBut] = useState(false);

  const addSkill = (element) => {
    for (let index = 0; index < skills.length; index++) {
      if (skills[index]._id === element._id) {
        toast.error("Skill already added!");
        return;
      }
    }
    let newSkills = skills;
    newSkills.push(element);
    setSkills(newSkills);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setDisableBut(true);
    let reqBody = [];
    console.log(skills)
    skills.forEach((skill) => reqBody.push(skill._id));
    try {
      if (skillType === "Coding Skills") {
        await api.post(`${endpoint}`, {
          skills: reqBody,
        });
      } else if (skillType === "Interpersonal Skills")
      {
        await api.post(`${endpoint}`, {
          softSkills: reqBody,
        });
      }
      else  {
        await api.post(`${endpoint}`, {
          languages: reqBody,
        });
      }
        toast.success("Data saved!");
        setCount(count + 1);
    } catch (error) {
      toast.error("Server Error!");
      setDisableBut(false);
    }
  };

  return (
    <div>
      <h4 style={{ color: "#F49424" }}>{skillType}</h4>
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
          display: "grid",
          grid: "auto /auto auto auto auto",
          height: "100%",
          marginTop: "1rem",
        }}
      >
        {skills.map((skill) => (
          <SkillItem key={skill._id} skill={skill} />
        ))}
      </div>
      <Button
        onClick={onSubmit}
        disabled={skills.length === 0 || disableBut}
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
