import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function ProfileMatch() {
  const [progress, setProgress] = React.useState(30);
  const styleProgress={
    display:"flex",
    width:"fit-content",
    height:"fit-content",
    alignItems:"center",
    border:"2px solid rgba(0, 0, 0, 0.35)",
    borderRadius:"10px",
    padding:"8px"
  }

  return(
  <div style={styleProgress}>
    <CircularProgressWithLabel value={progress} />
    <p style={{marginLeft:"0.5rem",fontWeight:"600"}}>Profile Match</p>
  </div> 
  );
}