import React from "react";
import Badge from "../Badge/Badge";
import FeatherIcon from "feather-icons-react";
import "./DriveHeader.css"
import moment from "moment/moment";
import CircularProgressWithLabel from "@mui/material"
import ProfileMatch from "../Profile Match/ProfileMatch";

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

const DriveHeader = ({ job }) => {
  const regitrationDeadline=moment(job.regitrationDeadline).format('DD/MM/YYYY')
  return (
    <div className="driveitem-root">
      <div className="drive-header-root">
        <div className="drive-header">
          <img src={job.company.logoUrl} height={60} className="drive-logo" />
          <div className="drive-header-group">
            <p className="drive-company">Placement Drive by {job.company.name}</p>
            <p className="drive-role">{job.role}</p>
          </div>
        </div>
        <ProfileMatch />
      </div>
      <div className="drive-body-root">
        <div className="drive-badge-group">
        <Badge icon={"clock"} text={new Date(job.regitrationDeadline).toLocaleString('en-in',{month:'short', year:'numeric', day:'numeric',hour: '2-digit', minute:'2-digit'})} color="#e67300" backgroundColor="#fff2e6" />
          {job.bondApplicable && <Badge icon={"file-text"} text={`${job.bondDuration} Year Bond`} color="#da5885" backgroundColor="#fbeff5" />}
          <Badge icon={"briefcase"} text={`${parseRoleType(job.role)} Role`} />
          {job.noOfPositions && <Badge icon={"users"} text={`${job.noOfPositions} Positions`} />}
          {job.location && <Badge icon={"map-pin"} text={job.location} />}
        </div>
        <div className="drive-quick-action-root">
          <div className="drive-salary-bookmark">
          <div className="drive-salary">
            <p className="drive-salary-icon">₹</p>
            <p className="drive-salary-text">
              {job.ctc.toLocaleString("en-IN")} LPA
            </p>
          </div>
          <div className="drive-save-job">
          <FeatherIcon
            icon={"bookmark"}
            color="#213780"
            size={17}
            className="drive-bookmark-icon"
          />
          <p className="drive-bookmark-text">Bookmark</p>
        </div>
        </div>
          <div style={{display:"flex",flexDirection:"column",alignContent:"end"}}>
          <button className="drive-apply-button">Apply Now</button>
          <p style={{marginTop:"0.5rem",fontWeight:"600"}}>Apply before {regitrationDeadline}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriveHeader;
