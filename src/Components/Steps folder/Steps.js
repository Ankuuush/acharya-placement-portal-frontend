import { borderLeft, Container, createTheme, style } from '@mui/system';
import React from 'react';
import { Card , Stepper, Step, StepLabel, StepIcon, SvgIcon} from '@mui/material';
import { TripOrigin } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import '../Steps folder/Stepcss.css';


const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 30,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#C4C4C4',
        borderLeft: '4px solid orange',
        minHeight:"45px"
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#F49424',
        borderLeft: '4px solid orange'
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.white[800] : '#FFFFFF',
      borderTopWidth: 10,
      borderRadius: 1,
      minHeight:45,
      borderLeft: '4px solid white'
    },
  }));

  const steps = ['Personal Details', 'Educational Details', 'Skill Set', 'Internship Experience', 'Projects', 'Certifications', 'Achievements'];


function Steps({activeStep}) {

    return(
        <div style={{ width: "18rem", margin: "0 3rem" ,height:"90vh", backgroundColor: "#1E4786", display: "flex", justifyContent:"center", borderRadius:"15px"}}>
           
           <Stepper  activeStep={activeStep} connector={<QontoConnector />} orientation={"vertical"} style={{color:"white"}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel  >{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
           
        </div>
    )
}


export default Steps;