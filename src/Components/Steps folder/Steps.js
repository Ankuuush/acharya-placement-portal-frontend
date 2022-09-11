import { Container, createTheme, style } from '@mui/system';
import React from 'react';
import { Card , Stepper, StepConnector, Step, StepLabel, StepIcon} from '@mui/material';
import { TripOrigin } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';


function Steps() {
   
      
  
    return(
        <div style={{ width: "18rem", margin: "3rem" , backgroundColor: "#1E4786", display: "flex", justifyContent:"center"}}>
           
            <Stepper orientation='vertical' activeStep={1} connector={<StepConnector/>}>
            
                <Step>
                    <StepLabel icon={<TripOrigin style={{color:"#C4C4C4"}}/>}>Personal Details</StepLabel>
                </Step>
                <Step>
                    <StepLabel icon={<TripOrigin style={{color:"#C4C4C4"}}/>}>Educational Deatils</StepLabel>
                </Step>
                <Step>
                    <StepLabel icon={<TripOrigin style={{color:"#C4C4C4"}}/>}>Skill Set</StepLabel>
                </Step>
                <Step>
                    <StepLabel icon={<TripOrigin style={{color:"#C4C4C4"}}/>}>Intership Experience</StepLabel>
                </Step>
                <Step>
                    <StepLabel icon={<TripOrigin style={{color:"#C4C4C4"}}/>}>Projects</StepLabel>
                </Step>
                <Step>
                    <StepLabel icon={<TripOrigin style={{color:"#C4C4C4"}}/>}>Certifications</StepLabel>
                </Step>
                <Step>
                    <StepLabel icon={<TripOrigin style={{color:"#C4C4C4"}}/>}>Achievements</StepLabel>
                </Step>
                
            </Stepper>
           
        </div>
    )
}


export default Steps;
