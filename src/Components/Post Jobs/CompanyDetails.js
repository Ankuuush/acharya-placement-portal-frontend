import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";

const CompanyDetails = ({ setActiveStep, postJob, setPostJob }) => {
  const onChange = (e) => {
    setPostJob({ ...postJob, [e.target.name]: e.target.value });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    setActiveStep(prev=> prev+1)
  }
  return (
    <div>
      <h3>Company Details</h3>
      <form onSubmit={handleSubmit}>
        <Box sx={{ margin: "0.35rem 0" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Company</InputLabel>
            <Select
              name="company"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={postJob.company}
              label="Company"
              onChange={onChange}
              required
            >
              <MenuItem value={"Google"}>Google</MenuItem>
              <MenuItem value={"Infosys"}>Infosys</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          name="location"
          onChange={onChange}
          value={postJob.location}
          size="normal"
          label="Location"
          type="text"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <Button
          size="large"
          variant="contained"
          color="warning"
          type="submit"
          style={{
            width: "60%",
            marginLeft: "20%",
            position: "relative",
            marginTop: "1rem",
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
            padding: "0.5rem",
          }}
        >
          Save & Next
        </Button>
      </form>
    </div>
  );
};

export default CompanyDetails;
