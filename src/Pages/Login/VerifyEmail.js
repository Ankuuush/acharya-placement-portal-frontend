import { Button, Container, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
      const response=await fetch(`https://${process.env.REACT_APP_BASE_URL}/auth/resendEmailVerification`,
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({email:email}),
    });
    alert("Email verification has been sent to your email!")
    navigate('/login')
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <div style={{display:"flex", justifyContent:"center", flexDirection:"column", width:"30vw", margin:"2rem auto"}}>
      <h2>Please verify your email to continue!!</h2>
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
            >Resend Email Verification</Button>
            <Link
              to="/login"
              style={{color:"#4A75B5" , textDecoration:"none", fontSize:"30px", margin:"0 auto"}}
            >
              Login
            </Link>
    </div>
  )
}

export default VerifyEmail