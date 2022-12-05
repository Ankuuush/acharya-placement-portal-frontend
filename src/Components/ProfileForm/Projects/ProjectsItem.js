import React from "react";
import {
  Button,
  TextField,
} from "@mui/material";

const ProjectsItem = (props) => {
  const { projects, setProjects, handleSubmit, disableForm } =
    props;
  
  const onChange = (e) => {
    if (!disableForm)
    setProjects({ ...projects, [e.target.name]: e.target.value});
  };

  return(
  <form
      disabled={disableForm}
      onSubmit={handleSubmit}
      style={{
        margin: "0",
      }}
    >
      <h3 style={{marginBottom: 20}}>Enter the details</h3>
      <TextField
        name="title"
        onChange={onChange}
        value={projects.title}
        disabled={disableForm}
        size="normal"
        label="Title"
        type="text"
        variant="outlined"
        style={{ width: "100%", margin: "0.35rem 0" }}
        required
      />
      <TextField
        name="link"
        onChange={onChange}
        value={projects.link}
        disabled={disableForm}
        size="normal"
        label="Project Link"
        type="url"
        variant="outlined"
        style={{ width: "100%", margin: "0.35rem 0" }}
        required
      />
      
      <TextField
        name="description"
        onChange={onChange}
        value={projects.description}
        disabled={disableForm}
        size="normal"
        label="Description"
        multiline
        rows={3}
        type="text"
        variant="outlined"
        style={{ width: "100%", margin: "0.35rem 0" }}
        required
      />

      {!disableForm && (
        <Button
          size="large"
          variant="contained"
          type="submit"
          color="warning"
          style={{
            width: "50%",
            marginTop: "1rem",
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
            padding: "0.5rem",
          }}
        >
          Save
        </Button>
      )}
    </form>);
};

export default ProjectsItem;
