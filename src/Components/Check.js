import React from 'react'
import FeatherIcon from "feather-icons-react";

const Check = () => {
    const style={
        width:"1rem",
        height:"1rem",
        borderRadius:"0.5rem",
        background:"#F49424",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }
  return (
    <div style={style}>
        <FeatherIcon icon={"check"} size="12px" color="white" />
        </div>
  )
}

export default Check