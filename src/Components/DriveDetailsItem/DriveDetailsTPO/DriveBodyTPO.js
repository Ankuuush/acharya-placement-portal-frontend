import React from "react";
import "../DriveBody.css";
import FeatherIcon from "feather-icons-react";
import Badge from "../../Badge/Badge";
import StudentListBody from "../../StudentListBody/StudentListBody";
import api from "../../../api";

const DriveBodyTPO = ({ job,skills,eligibilityData }) => {

  const [students, setStudents] = React.useState([])
  React.useEffect(()=>{
    api.get('/tpo/eligibility/calculate',eligibilityData).then((res)=>{
      setStudents(res.data.data.students)
    })
  })
  return (
    <div className="drive-body-root">
      <div className="drive-body-jd">
        <h3>About the role</h3>
        <p className="drive-jd">{job.jd}</p>
        <p className="drive-jd">{job.jd}</p>
        <div style={{ marginTop: "1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
          </div>
          {skills.skills && skills.skills.length >0 && (
            <div>
              <h3 style={{ marginTop: "2rem" }}>Required Skills</h3>
              <div className="badge-group">
                {skills.skills.map((skill) => {
                  return <Badge text={skill.name} />;
                })}
              </div>
            </div>
          )}
          {skills.softSkills && skills.softSkills.length > 0 && (
            <div>
              <h3 style={{ marginTop: "2rem" }}>Required Soft-Skills</h3>
              <div className="badge-group">
                {skills.softSkills.map((skill) => {
                  return <Badge text={skill.name} />;
                })}
              </div>
            </div>
          )}
          {skills.languages && skills.languages.length > 0 && (
            <div>
              <h3 style={{ marginTop: "2rem" }}>Required Languages</h3>
              <div className="badge-group">
                {skills.languages.map((skill) => {
                  return <Badge text={skill.name} />;
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
      <StudentListBody students={students} />
    </div>
  );
};

export default DriveBodyTPO;
