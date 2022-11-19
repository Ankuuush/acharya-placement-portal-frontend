import React from "react";
import "./DriveBody.css";
import FeatherIcon from "feather-icons-react";
import Badge from "../Badge/Badge";
import Attachment from "../Attachment/Attachment";

const DriveBody = ({ job }) => {
  return (
    <div className="drive-body-root">
      <div className="drive-body-jd">
        <h3>About the role</h3>
        <p className="drive-jd">{job.jd}</p>
        <p className="drive-jd">{job.jd}</p>
        <h3 style={{ marginTop: "2rem" }}>Eligibility Calculations</h3>
        <div style={{ marginTop: "1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {job.calculatedEligibility.eligibilityList.map((item) => {
              return (
                <div className="eligibility-param">
                  {item.pass ? (
                    <div className="eligibility-param-check">
                      <FeatherIcon icon="check" size={15} color="#064709" />
                    </div>
                  ) : (
                    <div className="eligibility-param-x">
                      <FeatherIcon icon="x" size={15} color="#d65885" />
                    </div>
                  )}
                  <p className="eligibility-param-text">{item.reason}</p>
                </div>
              );
            })}
          </div>
          {job.eligibility.skills && job.eligibility.skills.length >0 && (
            <div>
              <h3 style={{ marginTop: "2rem" }}>Required Skills</h3>
              <div className="badge-group">
                {job.eligibility.skills.map((skill) => {
                  return <Badge text={skill.name} />;
                })}
              </div>
            </div>
          )}
          {job.eligibility.softSkills && job.eligibility.softSkills.length > 0 && (
            <div>
              <h3 style={{ marginTop: "2rem" }}>Required Soft-Skills</h3>
              <div className="badge-group">
                {job.eligibility.softSkills.map((skill) => {
                  return <Badge text={skill.name} />;
                })}
              </div>
            </div>
          )}
          {job.files && job.files.length > 0 && (
            <div>
              <h3 style={{ marginTop: "2rem" }}>Attachments</h3>
              <div className="badge-group" style={{marginTop: 20}}>
                {job.files.map((file) => {
                  console.log(file);
                  return <Attachment fkey={file.key} location={file.location} size={file.size} type={file.contentType} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className="drive-about-company">
        <h3>About the Company</h3>
        <p className="drive-jd">{job.jd}</p>
      </div> */}
    </div>
  );
};

export default DriveBody;
