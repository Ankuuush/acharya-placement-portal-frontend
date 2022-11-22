import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider({width,setAmount}) {
  const [value, setValue] = React.useState([0, 100]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(()=>{
    const min=value[0]/100*2000000
    const max=value[1]/100*2000000
    setAmount([min,max])
  },[value])

  return (
    <Box sx={{ width: width }}>
      <Slider
         getAriaLabel={() => 'Temperature range'}
         value={value}
         onChange={handleChange}
         valueLabelDisplay="off"
         getAriaValueText={valuetext}
      />
    </Box>
  );
}