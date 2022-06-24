import { Button,Alert } from '@mui/material'
import { updateCurrentUser } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext/AuthContext'

const Home = () => {
  const [error, setError] = useState(false)
  const authContext = useContext(AuthContext)
  const {currentUser}=authContext
  const handleClick=(e)=>{
    e.preventDefault();

  }
  return (
    <>
    <div>Home</div>
    {error && <Alert variant="danger">{error}</Alert>}
    <h4>Email: {currentUser.email}</h4>
    <Link to='update-profile'>Update Profile</Link>
    <Button onClick={handleClick}>Logout</Button>
    </>
  )
}

export default Home