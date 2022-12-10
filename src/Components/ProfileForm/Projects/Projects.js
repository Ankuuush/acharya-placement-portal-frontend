import React from "react";
import { useState } from "react";
import NextButton from "../../Items/NextButton";
import api from "../../../api";
import { Button } from "@mui/material";
import ProjectsItem from "./ProjectsItem";
import { toast } from "react-toastify";

const Projects = ({ setActiveStep,handleAdd=false }) => {
  const [projectsArray, setProjectsArray] = useState([]);
  const [newForm, setNewForm] = useState(true);
  const [projects, setProjects] = useState({
    title: "",
    description: "",
    link: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newprojectsArray = projectsArray;
    newprojectsArray.push(projects);
    setProjectsArray(newprojectsArray);
    api
      .post(`/student/profile/projects`, {
        title: projects.title,
        description: projects.description,
        link: projects.link,
      })
      .then((response) => {
        toast.success("Data saved!");
        setProjects({
          title: "",
          description: "",
          link: "",
        });
        setNewForm(false);
        if(handleAdd)
        {
          handleAdd(response.data.data.profile.projects)
        }
      })
      .catch(() => {
        toast.error("Server Error!");
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width:"100%"
      }}
    >
      <h2 style={{marginBottom: 25}}>Add A Project</h2>
      <div style={{ position: "relative", width: "100%" }}>
        {projectsArray.map((pArr, key) => {
          return (
            <ProjectsItem
              key={key}
              disableForm={true}
              projects={pArr}
              setProjects={setProjects}
              handleSubmit={handleSubmit}
            />
          );
        })}
        {newForm && (
          <ProjectsItem
            disableForm={false}
            projects={projects}
            setProjects={setProjects}
            handleSubmit={handleSubmit}
          />
        )}
        {!handleAdd && <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            disabled={newForm}
            size="large"
            variant="contained"
            color="warning"
            onClick={() => setNewForm(true)}
            style={{
              width: "48%",
              marginTop: "1rem",
              marginBottom: "0.5rem",
              fontSize: "0.9rem",
              padding: "0.5rem",
            }}
          >
            Add Another
          </Button>
          <NextButton
            setActiveStep={setActiveStep}
            disable={false}
            styleProp={{ width: "48%" }}
          />
        </div>}
      </div>
    </div>
  );
};

export default Projects;
