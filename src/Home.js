import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate=useNavigate()
  return (
    <div>home
        <button onClick={()=>navigate('/admin',{state:{data:"no"}})}>admin</button>
    </div>
  )
}

export default Home