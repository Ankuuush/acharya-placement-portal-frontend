import React from 'react'
import { useLocation } from 'react-router-dom'
import DriveDetailsTPO from '../../../Components/DriveDetailsItem/DriveDetailsTPO/DriveDetailsTPO';

const JobPreview = () => {
    const location = useLocation()
    const {job,company,skillData}=location.state;
  return (
    <DriveDetailsTPO job={job} company={company} skillData={skillData} details={false} />
  )
}

export default JobPreview