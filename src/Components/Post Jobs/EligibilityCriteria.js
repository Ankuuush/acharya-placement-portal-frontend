import { Button, TextField } from '@mui/material';
import React from 'react'
import { toast } from 'react-toastify';
import api from '../../api';
import Skills from '../ProfileForm/Skills/Skills';
import SkillsSearch from '../ProfileForm/Skills/SkillsSearch';

const EligibilityCriteria = ({setActiveStep,postJob, setPostJob}) => {
  const onChange = (e) => {
    setPostJob({ ...postJob, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    api.post('/tpo/drives',postJob).then(response=>{
      console.log(response)
    }).catch(error=>{
      toast.error("Server Error!!")
    })
    console.log(postJob)
  }
  const setSkills=(data)=>{
    setPostJob({...postJob,eligibility:{...postJob.eligibility,skills:data}})
  }
  const setSoftSkills=(data)=>{
    setPostJob({...postJob,eligibility:{...postJob.eligibility,softSkills:data}})
  }
  const setLanguages=(data)=>{
    setPostJob({...postJob,eligibility:{...postJob.eligibility,languages:data}})
  }
  return (
    <div>
      <h3>Eligibility Criteria</h3>
      <h4 style={{ color: "#F49424",marginTop: 20 }}>Coding Skills</h4>
      <SkillsSearch endpoint={"/tpo/skills"} disableBut={false} skills={postJob.eligibility.skills} setSkills={setSkills} skillType={'Coding Skills'} />
      <h4 style={{ color: "#F49424" }}>Interpersonal Skills</h4>
      <SkillsSearch endpoint={"/tpo/softSkills"} disableBut={false} skills={postJob.eligibility.softSkills} setSkills={setSoftSkills} skillType={'Interpersonal Skills'} />
      <h4 style={{ color: "#F49424" }}>Languages</h4>
      <SkillsSearch endpoint={"/tpo/languages"} disableBut={false} skills={postJob.eligibility.languages} setSkills={setLanguages} skillType={'Languages'} />
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