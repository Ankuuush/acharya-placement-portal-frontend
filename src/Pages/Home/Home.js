import { Button,Alert } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext/AuthContext'

const Home = () => {
  const [error, setError] = useState(false)
  const authContext = useContext(AuthContext)
  const {currentUser,logout}=authContext
  let navigate=useNavigate();

  const handleClick=async (e)=>{
    e.preventDefault();
    setError('');
    try {
      await logout();
      navigate('/login')
    } catch {
      setError('Failed to logout.')
    }
  }
  return (
    <>
    <div>Home</div>
    {error && <Alert variant="danger">{error}</Alert>}
    <h4>Email: {currentUser.email}</h4>
    <p>Name: {currentUser.displayName}</p>
    <Button onClick={handleClick}>Logout</Button>
    </>
  )
}

export default Home