import React from 'react';
import {Stepper, Step, StepLabel} from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';



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

  


function Steps({activeStep,steps}) {

    return(
        <div style={{height:"fitContent", backgroundColor: "#1E4786", display: "flex", justifyContent:"center", borderRadius:"15px", padding: "2rem 2rem",width:"100%"}}>
           
           <Stepper  activeStep={activeStep} connector={<QontoConnector />} orientation={"vertical"} style={{color:"white"}}>
        {steps.map((label) => (
          <Step key={label} sx={{
            '& .MuiStepLabel-label': {
              color: 'white',
              transition: "none"
               // circle color (INCOMPLETE)
            },
            '& .MuiStepIcon-root': {
              color: 'white',
              transition: "none"
               // circle color (INCOMPLETE)
            },
            '& .MuiStepIcon-text': {
              fill: 'black',
               // circle color (INCOMPLETE)
            },
            '& .MuiStepLabel-root .Mui-completed': {
              color: 'orange',
               // circle color (COMPLETED)
            },
            '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
              {
                color: 'green', // Just text label (COMPLETED)
              },
            '& .MuiStepLabel-root .Mui-active': {
              color: 'orange', // circle color (ACTIVE)
            },
            '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
              {
                color: 'green', // Just text label (ACTIVE)
              },
            '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
              fill: 'blue',
               // circle's number (ACTIVE)
            },
          }}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
           
        </div>
    )
}


export default Steps;