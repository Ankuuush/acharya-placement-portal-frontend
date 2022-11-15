import React from "react";
import Badge from "../../Components/Badge/Badge";
import FeatherIcon from "feather-icons-react";
import DriveHeader from "../../Components/DriveDetailsItem/DriveHeader";
import DriveBody from "../../Components/DriveDetailsItem/DriveBody";
import { useLocation } from "react-router-dom";

const DriveDetails = () => {
    // const job={
    //     "files": [],
    //     "_id": "6360b5c5c38471948640fd07",
    //     "role": "Full Stack Developer",
    //     "createdOn": 1667282016395,
    //     "jobType": "full-time",
    //     "jd": "Development of large scale projects and products for some of the top organizations across several countries.Assisting the development heads and leads with all aspects of software design and coding. \n Attending and contributing to company development meetings. \n Monitoring the technical performance of internal systems.Development of large scale projects and products for some of the top organizations across several countries.Assisting the development heads and leads with all aspects of software design and coding. Attending and contributing to company development meetings. Monitoring the technical performance of internal systems.",
    //     "ctc": 600000,
    //     "regitrationDeadline": "2022-09-24T18:30:00.000Z",
    //     "eligibility": {
    //       "age": 21,
    //       "tenthPercentage": 32,
    //       "graduationPercentage": 72.5,
    //       "skills": [
    //         "6307a1fa0f099383daab6425",
    //         "6307a1fa0f099383daab6426"
    //       ],
    //       "softSkills": [
    //         "6307a1fa0f099383daab6425",
    //         "6307a1fa0f099383daab6426"
    //       ],
    //       "languages": [
    //         "6307a1fa0f099383daab6425",
    //         "6307a1fa0f099383daab6426"
    //       ]
    //     },
    //     "noOfPositions": 5,
    //     "bondApplicable": true,
    //     "bondDuration": 2,
    //     "bondStatement": "Pay the company 5,00,000 in case of failure to adhering to the bond",
    //     "location": "Bangalore",
    //     "venue": "MBA Seminar Hall",
    //     "additionalInfo": "Applicants must be attentive and smart",
    //     "locked": false,
    //     "createdBy": "PburSZVOSvNAOWSphCWbHBprfWI3",
    //     "department": "BEIS",
    //     "slug": "full-stack-developer",
    //     "__v": 0,
    //     "company": {
    //       "_id": "6360b46cc38471948640fcfb",
    //       "name": "Infosys",
    //       "createdOn": 1667282016394,
    //       "external_id": null,
    //       "reviews": [],
    //       "questions": [],
    //       "processed": false,
    //       "logoUrl": "https://professionallyspeaking.net/wp-content/uploads/2017/04/infosys-logo.jpg",
    //       "website": "https://infosys.com",
    //       "slug": "infosys",
    //       "__v": 0
    //     }
    //   }
    const {state}=useLocation();
    const {job}=state
    const driveStyle={
      padding: "15px 20px",
      borderRadius: "5px",
      backgroundColor: "white"
    }
  return (
    <div style={driveStyle}>
      <DriveHeader job={job}/>
      <DriveBody job={job} />
      </div>
  );
};

export default DriveDetails;
