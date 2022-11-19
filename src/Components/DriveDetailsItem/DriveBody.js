import React from "react";
import "./DriveBody.css";
import FeatherIcon from "feather-icons-react";


const DriveBody = ({ job }) => {
  return (
    <div className="drive-body-root">

      <div className="drive-body-jd">
        <h3>About the role</h3>
        <p className="drive-jd">{job.jd}</p>
        {/* <h3 style={{marginTop:"1.5rem"}}>Job task and responsibilities</h3>
        <p className="drive-jd">{job.jd}</p> */}
         <h3 style={{marginTop:"1.5rem"}}>Eligibility Calculations</h3>
        <div style={{marginTop:"1rem"}}>
        <div style={{display: "flex", alignItems: "center", flexDirection: "row", flexWrap: "wrap"}}>
        {job.calculatedEligibility.eligibilityList.map((item) => {
            return (
              <div className="eligibility-param">
                {item.pass ? <div className="eligibility-param-check">
                <FeatherIcon icon="check" size={15} color="#064709" />
                </div>: <div className="eligibility-param-x">
                <FeatherIcon icon="x" size={15} color="#d65885" />
                </div>}
                <p className="eligibility-param-text">{item.reason}</p>
                </div>
            );
          })}
          </div>
          
        </div>
      </div>

      <div className="drive-body-eligibility">
        <h3>Skills and Qualification</h3>
        <p className="drive-jd">{job.jd}</p>
        {/* <h3 style={{marginTop:"1.5rem"}}>Eligibility Criteria</h3> */}

        <ul>
          {/* <li>Minimum age: {job.eligibility.age}years</li>
          <li>
            Minimum percentage in 10th: {job.eligibility.tenthPercentage}%
          </li>
          <li>
            Minimum percentage in graduation:{" "}
            {job.eligibility.graduationPercentage}%
          </li>
          {job.eligibility.skills ? (
            <li>
              Skils required:{" "}
              {job.eligibility.skills.map((item) => {
                return item + ", ";
              })}
            </li>
          ) : null}
          {job.eligibility.softSkills ? (
            <li>
              Soft Skils required:{" "}
              {job.eligibility.softSkills.map((item) => {
                return item + ", ";
              })}
            </li>
          ) : null}
          {job.eligibility.languages ? (
            <li>
              Languages required:{" "}
              {job.eligibility.languages.map((item) => {
                return item + ", ";
              })}
            </li>
          ) : null} */}
          {/* {job.calculatedEligibility.eligibilityList.map((item) => {
            return <li>{item.reason}</li>;
          })} */}
        </ul>
      </div>
      <div className="drive-about-company">
      <h3>About the Company</h3>
      <p className="drive-jd">{job.jd}</p>
      </div>
    </div>
  );
};

export default DriveBody;
