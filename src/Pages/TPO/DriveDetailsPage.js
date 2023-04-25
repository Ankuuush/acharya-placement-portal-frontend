import { useLocation, useParams } from "react-router-dom"
import DriveDetailsTPO from "../../Components/DriveDetailsItem/DriveDetailsTPO/DriveDetailsTPO"
import { useEffect, useState } from "react"
import api from "../../api"
import { toast } from "react-toastify"

const DriveDetailsPage = () => {
  const [skillData, setSkillData] = useState({})
  const location=useLocation()
  const {job}=location.state
  useEffect(() => {
    // api.get(`/tpo/drives/${driveid}`).then((res)=>{
    //   const response=res.data.data.drive.drive
    //   setJob(response)
    //   console.log(res)
    //   setSkillData({skills:response.eligibility.skills,softSkills:response.eligibility.softSkills,languages:response.languages})
    // }).catch(()=>{
    //   toast.error('Server error!!')
    // })
    setSkillData({skills:job.eligibility.skills,softSkills:job.eligibility.softSkills,languages:job.eligibility.languages})
  }, [])
  
    // const job={
    //     maxApplications: -1,
    //     openForAll: false,
    //     files: [],
    //     _id: "6360b5c5c38471948640fd07",
    //     role: "Full Stack Developer",
    //     createdOn: 1667282016395,
    //     jobType: "full-time",
    //     jd: "Development of large scale projects and products for some of the top organizations across several countries.Assisting the development heads and leads with all aspects of software design and coding. \n Attending and contributing to company development meetings. \n Monitoring the technical performance of internal systems.Development of large scale projects and products for some of the top organizations across several countries.Assisting the development heads and leads with all aspects of software design and coding. Attending and contributing to company development meetings. Monitoring the technical performance of internal systems.",
    //     ctc: 600000,
    //     regitrationDeadline: "2024-12-24T18:30:00.000Z",
    //     eligibility: {
    //       age: 21,
    //       tenthPercentage: 32,
    //       graduationPercentage: 72.5,
    //       skills:[
    //         {
    //           _id: "63062e20c029d7293780cc8f",
    //           name: "Cold Fusion",
    //           __v: 0
    //         }
    //       ],
    //       softSkills: [
    //         {
    //           _id: "6307a6488344cc779086e63d",
    //           name: "Logical reasoning",
    //           __v: 0
    //         }
    //       ],
    //       languages: [
    //         {
    //           _id: "6307a2000f099383daab6473",
    //           name: "Scottish",
    //           __v: 0
    //         }
    //       ]
    //     },
    //     noOfPositions: 10,
    //     bondApplicable: true,
    //     bondDuration: 3,
    //     bondStatement: "Pay the company 5,00,000 in case of failure to adhering to the bond",
    //     location: "Hyderabad",
    //     venue: "MBA Seminar Hall",
    //     additionalInfo: "Applicants must be attentive and smart",
    //     locked: false,
    //     createdBy: "PburSZVOSvNAOWSphCWbHBprfWI3",
    //     department: [
    //       "BEIS"
    //     ],
    //     slug: "full-stack-developer",
    //     __v: 0,
    //     company: {
    //       _id: "6360b46cc38471948640fcfb",
    //       name: "Infosys",
    //       createdOn: 1667282016394,
    //       external_id: null,
    //       reviews: [],
    //       questions: [],
    //       processed: false,
    //       logoUrl: "https://professionallyspeaking.net/wp-content/uploads/2017/04/infosys-logo.jpg",
    //       website: "https://infosys.com",
    //       slug: "infosys",
    //       __v: 0
    //     },
    //     "additionalQuestions": []
    //   }
    // const skillData={
    //   skills:job.eligibility.skills,
    //   softSkills:job.eligibility.softSkills,
    //   languages:job.eligibility.languages,
    // }

  return (
    <DriveDetailsTPO job={job} company={job.company} skillData={skillData} details={true} />
  )
}

export default DriveDetailsPage