import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Logineg = () => {
    const navigate=useNavigate()
    const location=useLocation()
    const from=location.state.from.pathname
    console.log(location)
  return (
    <div>Logineg
        <button onClick={()=>navigate(from,{state:{data:"go"},replace:true})}>login</button>
    </div>
  )
}

export default Logineg