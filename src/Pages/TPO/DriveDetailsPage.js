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
    setSkillData({skills:job.eligibility.skills,softSkills:job.eligibility.softSkills,languages:job.eligibility.languages})
  }, [job])
  
    

  return (
    <DriveDetailsTPO job={job} company={job.company} skillData={skillData} details={true} />
  )
}

export default DriveDetailsPage