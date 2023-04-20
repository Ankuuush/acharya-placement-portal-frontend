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

function butStyle(text) {
  switch (text) {
    case "Apply Now":
    case "View Details":
      return { backgroundColor: "#203674", color: "white" };
    case "Ongoing":
      return {
        backgroundColor: "rgba(244, 148, 36, 0.24)",
        color: "#F49424",
        pointerEvents: "none",
      };
    case "Rejected":
      return {
        backgroundColor: "rgba(230, 58, 20, 0.51)",
        color: "#E53A14",
        pointerEvents: "none",
      };
    case "Selected":
      return {
        backgroundColor: "rgba(28, 139, 46, 0.51)",
        color: "#16530C",
        pointerEvents: "none",
      };
    default:
      return { backgroundColor: "#ededed", color: "#62666c" };
  }
}

export default function JobItem({ job, text, change, toggleDriveBookmark, getAllDrives, from, removeCompanyHeader }) {
  const applyNow = () => {
    change("drives/" + job._id, "drive-details");
  };

  const viewStudents=()=>{
    change("student-list","student-list")
  }

  const deadlinePassed = new Date(job.regitrationDeadline) < new Date();
  const locked = job.locked

  return (
    <div className="jobitem-root">
      {deadlinePassed && <div className="expired-tag">Expired</div>}
      {!deadlinePassed && locked && <div className="locked-tag">Locked</div>}
      <div className="jobitem-inner-root">
        <div className="job-header-root">
          <div className="job-header">
            {!removeCompanyHeader && <img src={job.company.logoUrl} height={60} className="job-logo" />}
            <div className="job-header-group" style={{padding: removeCompanyHeader && 0}}>
              {!removeCompanyHeader && <p className="job-company" onClick={()=> change("company/" + job.company.slug, "company-details")}>{job.company.name}</p>}
              <div className="application-status">
              <p className="job-role">{job.role}</p>
              {job.applied && <div className="job-eligbility" style={{marginLeft: 20, backgroundColor: "#e6fbe7", padding: "2px 5px", borderRadius: 3}}>
                <FeatherIcon
                  icon={"check"}
                  color="green"
                  size={19}
                  className="bookmark-icon"
                />
                <p className="eligible">Applied</p>
              </div>}
              </div>
            </div>
          </div>
          {!removeCompanyHeader && text!=="View Details" && <div className="save-job" style={{background: job.bookmarked || from === "bookmarks" ? "#1f357e" : null}} onClick={()=> {
            toggleDriveBookmark(job._id, function(bookmarked){
              getAllDrives();
            });
          }}>
            <FeatherIcon
              icon={"bookmark"}
              color={job.bookmarked || from === "bookmarks" ? "white" : "#213780"}
              size={17}
              className="bookmark-icon-main"
            />
            {/* <p className="job-bookmark-text" style={{color: job.bookmarked ? "white" : null}}>{job.bookmarked ? "Bookmarked":"Bookmark"}</p> */}
          </div>}
        </div>
        <div className="job-body-root">
          <p className="job-jd">{job.jd}</p>
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
              text={`${parseRoleType(job.jobType)} Role`}
            />
            {job.noOfPositions && (
              <Badge icon={"users"} text={`${job.noOfPositions} Positions`} />
            )}
            {job.location && <Badge icon={"map-pin"} text={job.location} />}
          </div>
          <hr className="job-hr" />
          <div className="quick-action-root">
            <div className="job-salary">
              <p className="job-salary-icon">₹</p>
              <p className="job-salary-text">
                {job.ctc.toLocaleString("en-IN")} LPA
              </p>
            </div>
            <div className="job-apply-container">
              {job.applied==false ? <div>
                {job.calculatedEligibility.eligible ? <div className="job-eligbility">
                <FeatherIcon
                  icon={"check"}
                  color="green"
                  size={19}
                  className="bookmark-icon"
                />
                <p className="eligible">Eligible</p>
              </div>: <div className="job-eligbility">
                <FeatherIcon
                  icon={"x"}
                  color="#d45d87"
                  size={19}
                  className="bookmark-icon"
                />
                <p className="n-eligible">Not Eligible</p>
              </div>}
                </div> : null}
                {text==='View Students'?
                <button
                className="job-apply-button"
                style={butStyle('View Details')}
                onClick={viewStudents}
                >{text}</button>:
              <button
                className="job-apply-button"
                style={butStyle(text)}
                onClick={applyNow}
              >
                {text==="View Details"?text:!job.calculatedEligibility.eligible || job.applied  ? "View Details" : text}
              </button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
