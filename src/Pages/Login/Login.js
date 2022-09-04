import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  TextField,
  Alert,
} from "@mui/material";
import logo from "../../Assets/Acharya_logo.png";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/AuthContext";
import '../LoginSignUp.css'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);
  const { login } = authContext;
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(credentials.email, credentials.password);
      navigate("/");
    } catch {
      setError("Login failed.");
    }
    setLoading(false);
  };

  const myIconStyle = {
    width: "7em",
    height: "7em",
    borderRadius: "0",
  }

  return (
    <div id="login-signup-container" >
      <div id="left-component">
        <img src="https://research.collegeboard.org/media/2022-02/iStock_000021255451_Large-780x585.jpg" alt="left component" width="120%" height="100%" />
      </div>
      <div id="right-component">
        <Container style={{ width: "70%", marginTop: "8rem" }}>
          <div style={{ width: "100%", height: "7em", display: "flex", justifyContent: "center" }}>
            <img src={logo} alt="logo" className="collegeIcon" style={myIconStyle} />
          </div>
          <h2 style={{ textAlign: "center", marginTop: "1.5rem" }}>Placement Cell</h2>
          {error && (
            <Alert style={{ marginBottom: "1rem" }} severity="error">
              {error}
            </Alert>
          )}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              name="email"
              onChange={onChange}
              value={credentials.email}
              size="normal"
              label="Acharya Email"
              variant="outlined"
              type="email"
              style={{ width: "100%", margin: "0.35rem 0" }}
              required
            />
            <TextField
              name="password"
              onChange={onChange}
              value={credentials.password}
              size="normal"
              label="Password"
              type="password"
              variant="outlined"
              style={{ width: "100%", margin: "0.35rem 0" }}
              required
            />
         <Container style={{ width: "108%", display:"flex", justifyContent:"right" }}>
            <Link
              to="/forgot-password"
              style={{color:"#4A75B5" , textDecoration:"none"}}
            >
              Forgot Password?
            </Link>
            </Container>
           
            <Button
              disabled={loading}
              size="large"
              variant="contained"
              color="warning"
              type="submit"
              style={{ width: "60%", marginTop: "1rem", marginBottom: "0.5rem" }}
            >
              Login
            </Button>

          </form>
        </Container>
       
      </div>
    </div>
  );
};

export default Login;
