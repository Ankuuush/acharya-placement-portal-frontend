import React from "react";
import Badge from "../Badge/Badge";
import FeatherIcon from "feather-icons-react";
import "./DriveHeader.css";

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

const DriveHeader = ({ job, refreshJob , toggleDriveBookmark}) => {
  const handleSave = () => {
    toggleDriveBookmark(job._id, function(bookmarked){
      refreshJob();
    });
  };
  return (
    <div className="driveitem-root">
      <div className="drive-header-root">
        <div className="drive-header">
          <img src={job.company.logoUrl} height={60} className="drive-logo" />
          <div className="drive-header-group">
            <p className="drive-company">
              {job.company.name}
            </p>
            <p className="drive-role">{job.role}</p>
          </div>
        </div>
        {!job.calculatedEligibility.eligible ? <Badge
              icon={"x"}
              text={"Not Eligible To Apply"}
              color="#d65885"
              backgroundColor="#fbeff5"
            /> : <Badge
            icon={"check"}
            text={"Eligible To Apply"}
            color="green"
            backgroundColor="#e7fde8"
          />}
        {/* <ProfileMatch /> TODO:Do we need this? */}
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
        <div className="drive-quick-action-root" style={{marginTop: 30}}>
            <div className="drive-salary">
              <p className="drive-salary-icon">₹</p>
              <p className="drive-salary-text">
                {job.ctc.toLocaleString("en-IN")} LPA
              </p>
            </div>
            <div style={{display: "flex",alignItems: "center"}}>
            <div className="save-job" onClick={handleSave} style={{padding: 12,marginRight: 15, background: job.bookmarked ? "#1f357e" : null}}>
            <FeatherIcon
              icon={"bookmark"}
              color={job.bookmarked ? "white" : "#213780"}
              size={17}
              className="bookmark-icon"
            />
          </div>
          <button className="drive-apply-button" disabled={!job.calculatedEligibility.eligible} style={{cursor: !job.calculatedEligibility.eligible && "not-allowed", backgroundColor: !job.calculatedEligibility.eligible && "#ededed", color: !job.calculatedEligibility.eligible && "#62666c"}}>{job.calculatedEligibility.eligible ? "Apply To Drive" : "Not Eligible"}</button>
            </div>
        </div>
      </div>
      <hr className="job-hr" />
    </div>
  );
};

export default DriveHeader;
