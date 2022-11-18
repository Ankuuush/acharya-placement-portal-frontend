import React from "react";
import "./Jobitem.css";
import FeatherIcon from "feather-icons-react";
import Badge from "../../Components/Badge/Badge";
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

function butStyle(text){
  switch(text){
    case "Apply Now":
      return {backgroundColor:"#203674",color:"white"};
    case "Ongoing":
      return {backgroundColor:"rgba(244, 148, 36, 0.24)",color:"#F49424",pointerEvents:"none"}
    case "Rejected":
      return {backgroundColor:"rgba(230, 58, 20, 0.51)",color:"#E53A14",pointerEvents:"none"}
    case "Selected":
      return {backgroundColor:"rgba(28, 139, 46, 0.51)",color:"#16530C",pointerEvents:"none"}
  }
}

export default function JobItem({ job,text }) {
  const navigate=useNavigate()
  const applyNow=()=>{
    navigate('/student/drive-details',{state:{job:job}})
  }

  return (
    <div className="jobitem-root">
      <div className="job-header-root">
        <div className="job-header">
          <img src={job.company.logoUrl} height={60} className="job-logo" />
          <div className="job-header-group">
            <p className="job-company">{job.company.name}</p>
            <p className="job-role">{job.role}</p>
          </div>
        </div>
        <div className="save-job">
          <FeatherIcon
            icon={"bookmark"}
            color="#213780"
            size={17}
            className="bookmark-icon"
          />
          <p className="job-bookmark-text">Bookmark</p>
        </div>
      </div>
      <div className="job-body-root">
        <p className="job-jd">{job.jd}</p>
        <div className="badge-group">
          <Badge icon={"clock"} text={new Date(job.regitrationDeadline).toLocaleString('en-in',{month:'short', year:'numeric', day:'numeric',hour: '2-digit', minute:'2-digit'})} color="#e67300" backgroundColor="#fff2e6" />
          {job.bondApplicable && <Badge icon={"file-text"} text={`${job.bondDuration} Year Bond`} color="#da5885" backgroundColor="#fbeff5" />}
          <Badge icon={"briefcase"} text={`${parseRoleType(job.role)} Role`} />
          {job.noOfPositions && <Badge icon={"users"} text={`${job.noOfPositions} Positions`} />}
          {job.location && <Badge icon={"map-pin"} text={job.location} />}
          
        </div>
        <hr className="job-hr" />
        <div className="quick-action-root">
          <div className="job-salary">
            <p className="job-salary-icon">₹</p>
            <p className="job-salary-text">{job.ctc.toLocaleString('en-IN')} LPA</p>
          </div>
          <button className="job-apply-button" style={butStyle(text)} onClick={applyNow}>{text}</button>
        </div>
      </div>
    </div>
  );
}
