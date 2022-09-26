import React from "react";
import { useState } from "react";
import NextButton from "../../Items/NextButton";
import api from "../../../api";
import { Button } from "@mui/material";
import ProjectsItem from "./ProjectsItem";

const Projects = () => {
  const [loading, setLoading] = useState(false);
  const [projectsArray, setProjectsArray] = useState([]);
  const [newForm, setNewForm] = useState(true);
  const [projects, setProjects] = useState({
    title:"",
    description:"",
    link:""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newprojectsArray = projectsArray;
    newprojectsArray.push(projects);
    setProjectsArray(newprojectsArray);
    try {
      const response = await api
        .post(`/student/profile/projects`, {
          title:projects.title,
          description:projects.description,
          link:projects.link
        })
        .then((response) => response);
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
    setProjects({
        title:"",
    description:"",
    link:""
    })
    setNewForm(false);
    setLoading(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "30em",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "3em",
      }}
    >
      <h2>Projects</h2>
      <div style={{ position: "relative", width: "80%" }}>
        {projectsArray.map((pArr, key) => {
          return (
            <ProjectsItem
              key={key}
              loading={loading}
              disableForm={true}
              projects={pArr}
              setProjects={setProjects}
              handleSubmit={handleSubmit}
            />
          );
        })}
        {newForm && (
          <ProjectsItem
            loading={loading}
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
            disabled={loading || newForm}
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
            disable={loading || newForm}
            styleProp={{ width: "48%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
