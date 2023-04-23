import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

const JobDetails = ({ setActiveStep, postJob, setPostJob }) => {
  const handleBond = () => {
    setPostJob({ ...postJob,bondApplicable:!postJob.bondApplicable})
  };
  const onChange = (e) => {
    setPostJob({ ...postJob, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveStep((prev) => prev + 1);
  };
  return (
    <div>
      <h3>Drive Details</h3>
      <p style={{margin:  "10px 0px"}}>Add in basic drive details</p>
      <form onSubmit={handleSubmit}>
        <TextField
          name="role"
          onChange={onChange}
          value={postJob.role}
          size="normal"
          label="Role Name"
          type="text"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <TextField
          name="ctc"
          onChange={onChange}
          value={postJob.ctc}
          size="normal"
          label="Proposed CTC (In INR without commas)"
          type="number"
          variant="outlined"
          InputProps={{ inputProps: { min: 0 } }}
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <Box sx={{ margin: "0.35rem 0" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
            <Select
              name="jobType"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={postJob.jobType}
              label="Job Type"
              onChange={onChange}
              required
            >
              <MenuItem value={"full-time"}>Full Time</MenuItem>
              <MenuItem value={"internship"}>Internship</MenuItem>
              <MenuItem value={"contract"}>Contract</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          name="regitrationDeadline"
          InputLabelProps={{ shrink: true }}
          onChange={onChange}
          value={postJob.regitrationDeadline}
          size="normal"
          label="Registration Deadline"
          type="date"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <TextField
          name="jd"
          onChange={onChange}
          value={postJob.jd}
          size="normal"
          label="Job Description"
          type="text"
          multiline
          minRows={5}
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <TextField
          name="noOfPositions"
          onChange={onChange}
          value={postJob.noOfPositions}
          size="normal"
          label="No. Of Positions"
          type="number"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={postJob.bondApplicable}
              onChange={handleBond}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Bond Applicable"
        />
        <TextField
          disabled={!postJob.bondApplicable}
          name="bondDuration"
          onChange={onChange}
          value={postJob.bondDuration}
          size="normal"
          label="Bond Duration"
          type="number"
          variant="outlined"
          InputProps={{ inputProps: { min: 0 } }}
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <TextField
        disabled={!postJob.bondApplicable}
          name="bondStatement"
          onChange={onChange}
          value={postJob.bondStatement}
          size="normal"
          label="Bond Statement"
          type="text"
          multiline
          minRows={2}
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <TextField
          name="venue"
          onChange={onChange}
          value={postJob.venue}
          size="normal"
          label="Venue"
          type="text"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <TextField
          name="additionalInfo"
          onChange={onChange}
          value={postJob.additionalInfo}
          size="normal"
          label="Additional Info"
          type="text"
          multiline
          minRows={2}
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
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

export default JobDetails;
