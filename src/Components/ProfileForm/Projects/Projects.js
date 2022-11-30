import React from "react";
import { useState } from "react";
import NextButton from "../../Items/NextButton";
import api from "../../../api";
import { Button } from "@mui/material";
import ProjectsItem from "./ProjectsItem";
import { toast } from "react-toastify";

const Projects = ({ activeStep, setActiveStep }) => {
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
      .then(() => {
        toast.success("Data saved!");
        setProjects({
          title: "",
          description: "",
          link: "",
        });
        setNewForm(false);
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
        width: "30em",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h2>Projects</h2>
      <div style={{ position: "relative", width: "80%" }}>
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
        <div
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
            activeStep={activeStep}
            disable={false}
            styleProp={{ width: "48%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
