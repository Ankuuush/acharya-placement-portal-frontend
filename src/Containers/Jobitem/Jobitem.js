import React from "react";
import "./Jobitem.css";
import FeatherIcon from "feather-icons-react";
import Badge from "../../Components/Badge/Badge";

export default function JobItem({ job }) {
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
          <Badge icon={"clock"} text={"12th Novemeber, 23:59 p.m"} />
          <Badge icon={"map-pin"} text={"Bangalore"} />
          <Badge icon={"users"} text={"3 positions"} />
          <Badge icon={"briefcase"} text={"Full Time Role"} />
        </div>
        <hr className="job-hr" />
        <div className="quick-action-root">
          <div className="job-salary">
            <p className="job-salary-icon">₹</p>
            <p className="job-salary-text">{job.ctc.toLocaleString('en-IN')} LPA</p>
          </div>
          <button className="job-apply-button">Apply Now</button>
        </div>
      </div>
    </div>
  );
}
