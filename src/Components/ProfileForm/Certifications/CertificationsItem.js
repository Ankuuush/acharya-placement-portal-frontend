import React from "react";
import { Button, TextField } from "@mui/material";

const CertificationsItem = (props) => {
  const { certifications, setCertifications, handleSubmit, disableForm, loading } = props;

  const onChange = (e) => {
    if (!disableForm)
    setCertifications({ ...certifications, [e.target.name]: e.target.value });
  };
  return(
    <form
        disabled={disableForm}
        onSubmit={handleSubmit}
        style={{
          position: "relative",
          margin: "0",
        }}
      >
        <h3>Enter the details</h3>
        <TextField
          name="name"
          onChange={onChange}
          value={certifications.name}
          disabled={disableForm}
          size="normal"
          label="Title"
          type="text"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        
        <TextField
          name="organization"
          onChange={onChange}
          value={certifications.organization}
          disabled={disableForm}
          size="normal"
          label="Organization"
          type="text"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />

        <TextField
          name="description"
          onChange={onChange}
          value={certifications.description}
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
        <TextField
          name="certificateLink"
          onChange={onChange}
          value={certifications.certificateLink}
          disabled={disableForm}
          size="normal"
          label="Certification Link"
          type="url"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        {!disableForm && (
          <Button
            disabled={loading}
            size="large"
            variant="contained"
            type="submit"
            style={{
              width: "100%",
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

export default CertificationsItem;
