import { useNavigate } from "react-router-dom";
import AppliedItem from "../../Containers/Driveitem/Applieditem";
import FeatherIcon from "feather-icons-react";
import "./DashboardReport.css";
import GaugeChart from 'react-gauge-chart'
import { Select, MenuItem, Switch, FormControlLabel } from "@mui/material";
import React, { useState } from "react";

const DashboardReportTpo = ({ stats, change,getStatistics, toggleSettings }) => {
    const navigate = useNavigate();
    const [batch, setBatch] = useState("all");

    const handleChange = (event) => {
        getStatistics(event.target.value === "all" ? '':`?batch=${event.target.value}`);
        setBatch(event.target.value);
      };
  return (
    <div className="dashboard-report-root">
       <div style={{padding: "12px 12px", background: "#20357E", borderRadius: 5, marginBottom: 20, color: "white", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
       <h4>{stats.department} - {stats.batch === "all" ? "All batches" : stats.batch + " Batch"}</h4>
       <Select
        value={batch}
        size="small"
        label="Select Batch"
        onChange={handleChange}
        style={{color: "white", fontSize: 13, textTransform: "none", border: "1px solid white"}}
        sx={{
            color: "white",
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '.MuiSvgIcon-root ': {
              fill: "white !important",
            }
          }}
      >
        <MenuItem value="all">
          <em>All Batches</em>
        </MenuItem>
        {stats.listOfBatches.map((batch) => (
            <MenuItem value={batch}>{batch}</MenuItem>
        ))}
      </Select>
       </div>
      <div className="dashboard-report-top-bundle">
        <div className="report-card align-center-report">
          <div className="flex-align-report report-just-cent">
            <FeatherIcon
              icon={"users"}
              size={20}
              color={"#1f357e"}
              style={{ marginRight: 10 }}
            />
            <h4 className="report-text">Total Students</h4>
          </div>
          <h2 className="report-number">{stats.totalStudents}</h2>
        </div>
        <div className="report-card align-center-report">
          <div className="flex-align-report report-just-cent">
            <FeatherIcon
              icon={"user"}
              size={20}
              color={"#1f357e"}
              style={{ marginRight: 10 }}
            />
            <h4 className="report-text">Total Drives</h4>
          </div>
          <h2 className="report-number">{stats.numberOfDrives}</h2>
        </div>
        <div className="report-card align-center-report">
          <div className="flex-align-report report-just-cent">
            <FeatherIcon
              icon={"user"}
              size={20}
              color={"#1f357e"}
              style={{ marginRight: 10 }}
            />
            <h4 className="report-text">Visited Companies</h4>
          </div>
          <h2 className="report-number">{stats.numberOfVisitedCompanies}</h2>
        </div>
      </div>
      <div className="dashboard-report-top-bundle" style={{ marginTop: 15 }}>
        <div className="report-card align-center-report">
          <div className="flex-align-report report-just-cent">
            <FeatherIcon
              icon={"users"}
              size={20}
              color={"#1f357e"}
              style={{ marginRight: 10 }}
            />
            <h4 className="report-text">Students Placed</h4>
          </div>
          <h2 className="report-number">{stats.numberOfPlacedStudents}</h2>
          <GaugeChart
            nrOfLevels={3}
            colors={["#FF5F6D", "#FFC371", "green"]}
            arcWidth={0.25}
            percent={stats.numberOfPlacedStudents/stats.numberOfCompletedProfiles}
            textColor={"#1f357e"}
            needleColor={"#d4d6dd"}
          />
        </div>
        <div className="report-card align-center-report">
          <div className="flex-align-report report-just-cent">
            <FeatherIcon
              icon={"user"}
              size={20}
              color={"#1f357e"}
              style={{ marginRight: 10 }}
            />
            <h4 className="report-text">Male Students</h4>
          </div>
          <h2 className="report-number">{stats.numberOfMaleStudents}</h2>
          <GaugeChart
            nrOfLevels={1}
            colors={["#2A86CB"]}
            arcWidth={0.25}
            percent={1- stats.numberOfFemaleStudents/stats.numberOfCompletedProfiles}
            textColor={"#1f357e"}
            needleColor={"#d4d6dd"}
          />
        </div>
        <div className="report-card align-center-report">
          <div className="flex-align-report report-just-cent">
            <FeatherIcon
              icon={"user"}
              size={20}
              color={"#1f357e"}
              style={{ marginRight: 10 }}
            />
            <h4 className="report-text">Female Students</h4>
          </div>
          <h2 className="report-number">{stats.numberOfFemaleStudents}</h2>
          <GaugeChart
            nrOfLevels={1}
            colors={["#DC5B86"]}
            arcWidth={0.25}
            percent={stats.numberOfFemaleStudents/stats.numberOfCompletedProfiles}
            textColor={"#1f357e"}
            needleColor={"#d4d6dd"}
          />
        </div>
      </div>
      <div className="dashboard-report-top-bundle" style={{ marginTop: 15 }}>
        <div className="report-card align-center-report">
          <div className="flex-align-report report-just-cent">
            <FeatherIcon
              icon={"check"}
              size={20}
              color={"#1f357e"}
              style={{ marginRight: 10 }}
            />
            <h4 className="report-text">Completed Profiles</h4>
          </div>
          <h2 className="report-number">{stats.numberOfCompletedProfiles}</h2>
        </div>
        <div className="report-card align-center-report">
          <div className="flex-align-report report-just-cent">
            <FeatherIcon
              icon={"x"}
              size={20}
              color={"#1f357e"}
              style={{ marginRight: 10 }}
            />
            <h4 className="report-text">Incomplete Profiles</h4>
          </div>
          <h2 className="report-number">{stats.numberOfIncompleteProfiles}</h2>
        </div>
        <div className="report-card align-center-report">
          <div className="flex-align-report report-just-cent">
            <FeatherIcon
              icon={"file-text"}
              size={20}
              color={"#1f357e"}
              style={{ marginRight: 10 }}
            />
            <h4 className="report-text">Verified EOIs</h4>
          </div>
          <h2 className="report-number">{stats.numberOfVerifiedEOI}</h2>
        </div>
        <div className="report-card align-center-report">
          <div className="flex-align-report report-just-cent">
            <FeatherIcon
              icon={"clock"}
              size={20}
              color={"#1f357e"}
              style={{ marginRight: 10 }}
            />
            <h4 className="report-text">EOIs pending</h4>
          </div>
          <h2 className="report-number">
            {stats.numberOfEOIUnderVerification}
          </h2>
        </div>
      </div>
      {batch && batch !== "all" && <div className="report-card" style={{marginTop: 30}}>
      <div className="flex-align-report">
        <FeatherIcon icon={"edit"} size={20} color={"#1f357e"}  style={{marginRight: 10}} />
        <h4 className="report-text">Allow education details editing</h4>
          </div>
          <FormControlLabel style={{marginTop: 15}} control={<Switch checked={
            stats.settings?.educationEditAllowed} onChange={()=> toggleSettings("educationEditAllowed", batch)} />} label={stats.settings?.educationEditAllowed ? "Students can edit their education details" : "Students of your department are currently blocked from editing education details"} />
      </div>}
      <div className="dashboard-report-top-bundle" style={{ marginTop: 30 }}>
        <div className="report-card">
          <div className="flex-align-report">
            <FeatherIcon
              icon={"flag"}
              size={20}
              color={"#1f357e"}
              style={{ marginRight: 10 }}
            />
            <h4 className="report-text">Recently Visited Companies </h4>
          </div>
          {stats.recentVisitedCompanies ? (
            <div style={{ marginTop: 20 }} className="report-company-list">
              {Array.from(new Set(stats.recentVisitedCompanies)).map(
                (company) => {
                  return (
                    <div
                      className="drive-header rep-com-root"
                      style={{ marginTop: 5 }}
                      onClick={() =>
                        navigate("/student/company/" + company.slug)
                      }
                    >
                      <img
                        src={company.logoUrl}
                        style={{ height: 60, width: 60 }}
                        className="drive-logo"
                      />
                      <div className="drive-header-group">
                        <h4 className="drive-company">{company.name}</h4>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <p style={{ marginTop: 20 }}>No companies found</p>
          )}
        </div>
        <div className="report-card">
          <div className="flex-align-report">
            <FeatherIcon
              icon={"award"}
              size={20}
              color={"#1f357e"}
              style={{ marginRight: 10 }}
            />
            <h4 className="report-text">Recent Student Applications</h4>
          </div>
          <div>
          {stats.recentApplications.map((application) => {
            return (
              <div
                className="drive-header rep-com-root"
                style={{ marginTop: 5 }}
              >
                <img
                  src={application.profile.basicDetails.photoUrl}
                  style={{ height: 35, width: 35, borderRadius: 1000, marginRight: 5 }}
                  className="drive-logo"
                />
                <img
                  src={application.drive.company.logoUrl}
                  style={{ height: 35, width: 35 }}
                  className="drive-logo"
                />
                <div className="drive-header-group" style={{padding: 5, marginLeft: 10}}>
                  <h4 className="drive-company">
                    {application.drive.company.name}
                  </h4>
                  <h4 className="drive-title">{application.drive.role}</h4>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardReportTpo;
