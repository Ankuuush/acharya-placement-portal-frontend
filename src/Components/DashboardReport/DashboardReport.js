import { useNavigate } from "react-router-dom";
import AppliedItem from "../../Containers/Driveitem/Applieditem";
import FeatherIcon from "feather-icons-react";
import "./DashboardReport.css";

const DashboardReport = ({ stats, change }) => {
    const navigate = useNavigate();
  return (
    <div className="dashboard-report-root">
       {stats.placed &&  <div className="report-card" style={{background: "#1f357e", marginBottom: 20}}>
          <h4 className="report-text" style={{color: "white"}}>🎉 Congrats on getting placed!</h4>
          <p className="report-text" style={{color: "white", marginTop: 10}}>Our records indicate that you have been successfully placed at _____. Kindly fill the acknowledgement form below before _____.</p>
          <button className="report-ack-button">Fill Acknowledgement</button>
        </div>}
      <div className="dashboard-report-top-bundle">
        <div className="report-card align-center-report">
          <div className="flex-align-report report-just-cent">
          <FeatherIcon icon={"folder"} size={20} color={"#1f357e"} style={{marginRight: 10}} />
          <h4 className="report-text">Total Drives</h4>
          </div>
          <h2 className="report-number">{stats.drives}</h2>
        </div>
        <div className="report-card align-center-report">
        <div className="flex-align-report report-just-cent">
        <FeatherIcon icon={"check"} size={20} color={"#1f357e"} style={{marginRight: 10}} />
          <h4 className="report-text">Eligible In</h4>
          </div>
          <h2 className="report-number">{stats.eligibleDrives}</h2>
        </div>
        <div className="report-card align-center-report">
        <div className="flex-align-report report-just-cent">
        <FeatherIcon icon={"file-text"} size={20} color={"#1f357e"}  style={{marginRight: 10}} />
          <h4 className="report-text">Total Applications</h4>
          </div>
          <h2 className="report-number">{stats.applications}</h2>
        </div>
      </div>
      <div className="report-card" style={{marginTop: 30}}>
      <div className="flex-align-report">
        <FeatherIcon icon={"clock"} size={20} color={"#1f357e"}  style={{marginRight: 10}} />
        <h4 className="report-text">Most Recent Application</h4>
          </div>
        
        {stats.mostRecentApplication ? <AppliedItem application={stats.mostRecentApplication} job={stats.mostRecentApplication.drive} fromDashboard change={change} /> : <p style={{marginTop: 20}}>You have not applied to any drive yet. Start applying maybe?</p>}
      </div>
      <div className="dashboard-report-top-bundle" style={{marginTop: 30}}>
        <div className="report-card">
        <div className="flex-align-report">
        <FeatherIcon icon={"flag"} size={20} color={"#1f357e"}  style={{marginRight: 10}} />
        <h4 className="report-text">Visited Companies </h4>
          </div>
          {stats.companies ? <div style={{marginTop: 20}} className="report-company-list">
          {Array.from(new Set(stats.companies)).map(company=> {
            return (
                <div className="drive-header rep-com-root" style={{marginTop: 5}} onClick={()=> navigate("/student/company/" + company.slug)}>
          <img src={company.logoUrl} style={{height: 60,width: 60}} className="drive-logo" />
          <div className="drive-header-group">
            <h4 className="drive-company">{company.name}</h4>
          </div>
        </div>
            )
          })}
          </div> : <p style={{marginTop: 20}}>No companies found</p>}
        </div>
        <div className="report-card">
        <div className="flex-align-report">
        <FeatherIcon icon={"award"} size={20} color={"#1f357e"}  style={{marginRight: 10}} />
        <h4 className="report-text">Recently Placed Students</h4>
          </div>
          <p style={{marginTop: 20}}>No placement activity found</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardReport;
