import { Button, TextField } from '@mui/material';
import React from 'react'

const EligibilityCriteria = ({setActiveStep,postJob, setPostJob}) => {
  const onChange = (e) => {
    setPostJob({ ...postJob, [e.target.name]: e.target.value });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    setActiveStep(prev=> prev+1)
  }
  return (
    <div>
      <h3>Eligibility Criteria</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          name="age"
          onChange={onChange}
          value={postJob.age}
          size="normal"
          label="Minimum Age"
          type="number"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <TextField
          name="tenthPercentage"
          onChange={onChange}
          value={postJob.tenthPercentage}
          size="normal"
          label="Tenth Percentage"
          InputProps={{ inputProps: { min: 0, max: 100 } }}
          type="number"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
          <TextField
            name="twelfthPercentage"
            onChange={onChange}
            value={postJob.twelfthPercentage}
            size="normal"
            label="Twelfth Percentage"
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            type="number"
            variant="outlined"
            style={{ width: "100%", margin: "0.35rem 0" }}
            required
          />
        <TextField
          name="graduationPercentage"
          onChange={onChange}
          value={postJob.graduationPercentage}
          size="normal"
          label="Graduation Percentage"
          InputProps={{ inputProps: { min: 0, max: 100 } }}
          type="number"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <TextField
          name="internshipCount"
          onChange={onChange}
          value={postJob.internshipCount}
          size="normal"
          label="Internship Count"
          InputProps={{ inputProps: { min: 0} }}
          type="number"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <TextField
          name="projectCount"
          onChange={onChange}
          value={postJob.projectCount}
          size="normal"
          label="Project Count"
          InputProps={{ inputProps: { min: 0} }}
          type="number"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <TextField
          name="certificationCount"
          onChange={onChange}
          value={postJob.certificationCount}
          size="normal"
          label="Certification Count"
          InputProps={{ inputProps: { min: 0} }}
          type="number"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <TextField
          name="achievementCount"
          onChange={onChange}
          value={postJob.achievementCount}
          size="normal"
          label="Achievement Count"
          InputProps={{ inputProps: { min: 0} }}
          type="number"
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
          Save
        </Button>
      </form>
    </div>
  )
}

export default EligibilityCriteria