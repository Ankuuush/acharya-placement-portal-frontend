import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/navbar'
import ContactUs from '../ContactUs'
import FeedBack from '../FeedBack'
import AppliedJobs from './AppliedJobs'
import Resume from './Resume'
import StudentDashboard from './StudentDashboard'

const Dashboard = ({page=""}) => {
    const [component, setComponent] = useState("Explore Jobs")
    const [activeStep, setActiveStep] = useState(0);
    useEffect(() => {
      if(page)
      {setComponent(page)}
    }, [])
    
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar setComponent={setComponent}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3, background: "" }}>
        {component==="Explore Jobs" && <StudentDashboard activeStep={activeStep}
            setActiveStep={setActiveStep}/>}
        {component==="Applied Jobs" && <AppliedJobs/>}
        {component==="Build Resume" && <Resume/>}
        {component==="Feedback" && <FeedBack/>}
        {component==="Contact Us" && <ContactUs/>}
      </Box>
    </Box>
  )
}

export default Dashboard