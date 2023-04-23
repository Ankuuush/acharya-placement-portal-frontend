import React, { useState } from "react";
import CompanyDetails from "../../Components/Post Jobs/CompanyDetails";
import EligibilityCriteria from "../../Components/Post Jobs/EligibilityCriteria";
import JobDetails from "../../Components/Post Jobs/JobDetails";
import Steps from "../../Components/StepsFolder/Steps";

const PostJobs = () => {
  const steps = ["Company details", "Drive Details", "Eligibility Criteria"];
  const [activeStep, setActiveStep] = useState(0);
  const [company, setCompany] = useState({})
  const [postJob, setPostJob] = useState({
    company: "",
  jobType: "",
  // role: "",
  // jd: "",
  // ctc: 0,
  // regitrationDeadline:"" ,
  eligibility: {
    // age: 0,
    // tenthPercentage: 0,
    // twelfthPercentage: 0,
    // graduationPercentage: 0,
    // internshipCount: 0,
    // projectCount: 0,
    // certificationCount: 0,
    // achievementCount: 0,
    skills: [],
    softSkills: [],
    languages: []
  },
  // noOfPositions: 0,
  bondApplicable: false,
  // bondDuration: 0,
  // bondStatement: "",
  // location: "",
  // venue: "",
  // additionalInfo: ""
})
  const renderSwitch = () => {
    switch (activeStep) {
      case 0: return <CompanyDetails setActiveStep={setActiveStep} postJob={postJob} setPostJob={setPostJob} company={company} setCompany={setCompany} />
      case 1: return <JobDetails setActiveStep={setActiveStep} postJob={postJob} setPostJob={setPostJob}/>
      case 2: return <EligibilityCriteria setActiveStep={setActiveStep} postJob={postJob} setPostJob={setPostJob} company={company}/>
      default: return <CompanyDetails setActiveStep={setActiveStep} postJob={postJob} setPostJob={setPostJob} company={company}setCompany={setCompany} />
    }
  }
  return (
    <div>
      <div style={{paddingLeft: 60, marginTop: 30}}>
      <h3>Post a new Drive</h3>
      <p>Add a new drive from here, all eligible students will be automatically calculated, notified and shortlisted</p>
      </div>
      <div
      style={{
        display: "flex",
        boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
        padding: 20,
        background: "white",
        borderRadius: 15,
        width:"90%",
        margin:"2rem auto"
      }}
    >
      <div style={{width:"22%",marginRight:"8%"}}>
      <Steps activeStep={activeStep} steps={steps} />
      </div>
      <div style={{width:"55%"}}>{renderSwitch()}</div>
    </div>
    </div>
  );
};

export default PostJobs;
