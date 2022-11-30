import { Button, Container, TextField, Card } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api'

const VerifyEmail = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate();
  const onChange=(e)=>{
    setEmail(e.target.value);
  }

  const handleClick=async (e)=>{
    e.preventDefault();
    setLoading(true)
    try {
    //   const response=await fetch(`https://${process.env.REACT_APP_BASE_URL}/auth/resendEmailVerification`,
    // {
    //   method:"POST",
    //   headers:{
    //     "Content-Type":"application/json",
    //   },
    //   body:JSON.stringify({email:email}),
    // });
    await api.post('/auth/resendEmailVerification',
    {
      email:email
    })
    alert("Email verification has been sent to your email!")
    navigate('/login')
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <Container style={{ width: "25rem", marginTop: "10rem" }}>
       <Card variant="outlined">
      <h2 style={{marginLeft:"3rem", marginRight:"3rem"}}>Please verify your email to continue!!</h2>
      <Container style={{ width: "20rem", marginTop: "2rem" }}>
      <TextField
              name="email"
              onChange={onChange}
              value={email}
              size="normal"
              label="Email"
              variant="outlined"
              type="email"
              style={{ width: "100%",margin: "0.35rem 0" }}
              required
            />
            <Button
              disabled={loading}
              size="large"
              variant="contained"
              color="warning"
              onClick={handleClick}
              style={{ width: "100%", margin:"1rem auto" }}
            >Resend Email</Button>
             <Container style={{ width: "100%", display:"flex", justifyContent:"right", marginBottom:"2rem" }}>
            <Link
              to="/login"
              style={{color:"#4A75B5" , textDecoration:"none", fontSize:"16px", margin:"0 auto"}}
            >
              Login
            </Link>
            </Container>
            </Container>
            </Card>
            </Container>
  )
}

export default VerifyEmail