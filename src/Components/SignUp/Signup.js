import React from "react";
import { Button, Card, Container, TextField, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import "./Signup.css";
const Signup = () => {
  return (
    <Container style={{ width: "25rem", marginTop: "5rem" }}>
      <Avatar sx={{ bgcolor: "#F86528", width: 48, height: 48 }} style={{ bottom: "-1.5rem", margin: "0 auto" }} src=".../Assets/avatar.png"
      />
      <Card variant="outlined" >
        <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Sign Up</h2>
        <Container style={{ width: "20rem", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
          <TextField size="small" label="AUID" variant="outlined" style={{ width: "100%", margin: "0.35rem 0" }} />
          <TextField size="small" label="Password" type="password" variant="outlined" style={{ width: "100%", margin: "0.35rem 0" }} />
          <Button size="small" variant="contained" color="warning" type="Submit" style={{ width: "80%", marginTop: "2rem", marginBottom: "3rem" }}>Submit</Button>
        </Container>
      </Card>
      <p style={{ margin: "0", textAlign: "end" }}>Already have an account?<Link to='/login'> Log In</Link></p>
    </Container>
  );
};

export default Signup;
