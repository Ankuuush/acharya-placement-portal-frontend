import React from 'react'
import { useLocation } from 'react-router-dom'
import DriveDetailsTPO from '../../../Components/DriveDetailsItem/DriveDetailsTPO/DriveDetailsTPO';

const JobPreview = () => {
    const location = useLocation()
    const {job,company,skillData,eligibilityData}=location.state;
  return (
    <DriveDetailsTPO job={job} company={company} skillData={skillData} eligibilityData={eligibilityData} />
  )
}

export default JobPreview