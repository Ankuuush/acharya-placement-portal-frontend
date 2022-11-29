import React from "react";
import "./Applieditem.css";
import Badge from "../../Components/Badge/Badge";


export default function AppliedItem({ job, text, change, toggleDriveBookmark, getAllDrives, from, application }) {
  const viewDrive = () => {
    change("drives/" + job._id, "drive-details");
  };

  return (
    <div className="a-jobitem-root">
      <div className="jobitem-inner-root">
        <div className="job-header-root">
          <div className="job-header">
            <img src={job.company.logoUrl} height={60} className="job-logo" />
            <div className="job-header-group">
              <p className="job-company">{job.company.name}</p>
              <div className="application-status">
              <p className="job-role">{job.role}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="job-body-root">
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
            <Badge
                text={application.status}
                color="#20781f"
                backgroundColor="#e7fce8"
          />
          </div>
          <hr className="job-hr" />
          <div className="quick-action-root">
            <div className="job-apply-container">
            <button
                className="job-apply-button"
                style={{ backgroundColor: "#dfe2ec", color: "#585858" }}
                onClick={viewDrive}
              >
                View Drive
              </button>
              <button
                className="job-apply-button"
                style={{ backgroundColor: "#203674", color: "white", marginLeft: 20 }}
                onClick={viewDrive}
              >
                View Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
