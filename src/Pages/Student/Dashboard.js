import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/navbar'
import ContactUs from '../ContactUs'
import FeedBack from '../FeedBack'
import AppliedJobs from './AppliedJobs'
import Resume from './Resume'
import StudentDashboard from './StudentDashboard'
import Topbar from '../../Components/Topbar/Topbar'

const Dashboard = ({page=""}) => {
    const [component, setComponent] = useState("Explore Jobs")
    const [activeStep, setActiveStep] = useState(0);

    const changeSelectedComponent = (component) => {
        window.history.pushState({}, null, "/student/"+component);
        setComponent(component)
    }

    useEffect(() => {
      if(page)
      {setComponent(page)}
    }, [])
    
  return (
    <div style={{ display: "flex"}}>
      <NavBar setComponent={changeSelectedComponent} currentComponent={component}/>
      <div style={{flexGrow: 1,backgroundColor: "#f3f4f8",height: "100vh"}}>
        <Topbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, background: "" }}>
        {component==="explore-jobs" && <StudentDashboard activeStep={activeStep}
            setActiveStep={setActiveStep}/>}
        {component==="applied-jobs" && <AppliedJobs/>}
        {component==="resume" && <Resume/>}
        {component==="feedback" && <FeedBack/>}
        {component==="contact-us" && <ContactUs/>}
      </Box>
      </div>
    </div>
  )
}

export default Dashboard