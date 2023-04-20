import { Button } from "@mui/material";
import Badge from "../../Badge/Badge";
import "../DriveHeader.css";
import api from "../../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function parseRoleType(role) {
  switch (role) {
    case "fulltime":
      return "Full Time";
    case "part-time":
      return "Part Time";
    case "internship":
      return "Internship";
    case "contract":
      return "Contract";
    default:
      return "Full Time";
  }
}

const DriveHeaderTPO = ({ job,company,eligibilityData }) => {

  const navigate=useNavigate()

  const handleStudents=()=>{
    console.log(eligibilityData)
    navigate('/tpo/post-jobs/students',{state:{eligibilityData:eligibilityData}})
  }

  const handleSubmit=()=>{
    api.post('/tpo/drives',job).then(response=>{
        console.log(response)
        toast.success("Job posted!!")
        navigate('/tpo/post-jobs')
      }).catch(error=>{
        toast.error("Server Error!!")
      })
  }

  return (
    <div className="driveitem-root">
      <div className="drive-header-root">
        <div className="drive-header">
          <img src={company.logoUrl} height={60} className="drive-logo" />
          <div className="drive-header-group">
            <p className="drive-company">{company.name}</p>
            <p className="drive-role">{job.role}</p>
          </div>
        </div>
        {/* <ProfileMatch /> TODO:Do we need this? */}
        <div>
        <Button onClick={handleStudents}>View Shortlisted Students</Button>
        <Button onClick={handleSubmit}>Post Job</Button>
        </div>
      </div>
      <div className="drive-body-root">
        <div className="drive-body-top">
          <div className="badge-group">
            <Badge
              icon={"clock"}
              text={new Date(job.regitrationDeadline).toLocaleString("en-in", {
                month: "short",
                year: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              color="#e67300"
              backgroundColor="#fff2e6"
            />
            {job.locked && (
              <Badge
                icon={"lock"}
                text={`Locked`}
                color="#da5885"
                backgroundColor="#fbeff5"
              />
            )}
            {job.bondApplicable && (
              <Badge
                icon={"file-text"}
                text={`${job.bondDuration} Year Bond`}
                color="#da5885"
                backgroundColor="#fbeff5"
              />
            )}
            {job.openForAll && (
              <Badge
                icon={"check"}
                text={`Open For All`}
                color="#20781f"
                backgroundColor="#e7fce8"
              />
            )}
            <Badge
              icon={"briefcase"}
              text={`${parseRoleType(job.role)} Role`}
            />
            {job.noOfPositions && (
              <Badge icon={"users"} text={`${job.noOfPositions} Positions`} />
            )}
            {job.location && <Badge icon={"map-pin"} text={job.location} />}
          </div>
        </div>
        <div className="drive-quick-action-root" style={{ marginTop: 30 }}>
          <div className="drive-salary">
            <p className="drive-salary-icon">₹</p>
            <p className="drive-salary-text">
              {job.ctc.toLocaleString("en-IN")} LPA
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
          </div>
        </div>
      </div>
      <hr className="job-hr" />
    </div>
  );
};

export default DriveHeaderTPO;
