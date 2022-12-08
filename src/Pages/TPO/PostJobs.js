import React, { useState } from "react";
import CompanyDetails from "../../Components/Post Jobs/CompanyDetails";
import EligibilityCriteria from "../../Components/Post Jobs/EligibilityCriteria";
import JobDetails from "../../Components/Post Jobs/JobDetails";
import Steps from "../../Components/StepsFolder/Steps";

const PostJobs = () => {
  const steps = ["Company details", "Job Details", "Eligibility Criteria"];
  const [activeStep, setActiveStep] = useState(0);
  const [postJob, setPostJob] = useState({
    company: "",
  jobType: "",
  role: "",
  jd: "",
  ctc: "",
  regitrationDeadline: "",
  eligibility: {
    age: "",
    tenthPercentage: "",
    twelfthPercentage: "",
    graduationPercentage: "",
    internshipCount: "",
    projectCount: "",
    certificationCount: "",
    achievementCount: "",
    skills: [],
    softSkills: [],
    languages: []
  },
  noOfPositions: "",
  bondApplicable: true,
  bondDuration: "",
  bondStatement: "",
  location: "",
  venue: "",
  additionalInfo: ""
})
  const renderSwitch = () => {
    switch (activeStep) {
      case 0:return <CompanyDetails setActiveStep={setActiveStep} postJob={postJob} setPostJob={setPostJob} />
      case 1: return <JobDetails setActiveStep={setActiveStep} postJob={postJob} setPostJob={setPostJob}/>
      case 2: return <EligibilityCriteria setActiveStep={setActiveStep} activeStep={activeStep} postJob={postJob} setPostJob={setPostJob}/>
      default: return <CompanyDetails setActiveStep={setActiveStep} postJob={postJob} setPostJob={setPostJob}/>
    }
  }
  return (
    <div
      style={{
        display: "flex",
        boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
        padding: 20,
        background: "white",
        borderRadius: 15,
        width:"70%",
        margin:"2rem auto"
      }}
    >
      <div style={{width:"37%",marginRight:"8%"}}>
      <Steps activeStep={activeStep} steps={steps} />
      </div>
      <div style={{width:"55%"}}>{renderSwitch()}</div>
    </div>
  );
};

export default PostJobs;
