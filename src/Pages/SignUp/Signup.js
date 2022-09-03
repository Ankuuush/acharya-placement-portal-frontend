import React, { useContext, useState } from "react";
import { Button, Container, TextField, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/AuthContext";
import "../LoginSignUp.css";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { signup} = authContext;
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      return setError("Passwords do not match.");
    }
    try {
      setError("");
      setLoading(true);
      const response = await signup(
        credentials.email,
        credentials.password,
        credentials.firstName,
        credentials.lastName
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        alert("Please verify your email and then login to continue!!")
        navigate("/login");
      } else {
        setError("Failed to create an account");
      }
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <div id="login-signup-container">
      <div id="left-component">
        <img
          src="https://research.collegeboard.org/media/2022-02/iStock_000021255451_Large-780x585.jpg"
          alt="left component"
          width="100%"
          height="100%"
        />
      </div>
      <div id="right-component">
        <h2 style={{ textAlign: "center", marginTop: "6rem" }}>
          Let's Get You Registered!
        </h2>
        <Container style={{ width: "70%", marginTop: "2rem" }}>
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
              size="small"
              label="Email"
              variant="outlined"
              type="email"
              style={{ width: "100%", margin: "0.35rem 0" }}
              required
            />
            <TextField
              name="password"
              onChange={onChange}
              value={credentials.password}
              size="small"
              label="Password"
              type="password"
              variant="outlined"
              style={{ width: "100%", margin: "0.35rem 0" }}
              required
            />
            <TextField
              name="confirmPassword"
              onChange={onChange}
              value={credentials.passwordConfirm}
              size="small"
              label="Confirm Password"
              type="password"
              variant="outlined"
              style={{ width: "100%", margin: "0.35rem 0" }}
              required
            />
            <div style={{ position: "relative", width: "100%" }}>
              <TextField
                name="firstName"
                onChange={onChange}
                value={credentials.firstName}
                size="small"
                label="First Name"
                type="text"
                variant="outlined"
                style={{ width: "48%" }}
                required
              />
              <TextField
                name="lastName"
                onChange={onChange}
                value={credentials.lastName}
                size="small"
                label="Last Name"
                type="text"
                variant="outlined"
                style={{ width: "48%", position: "absolute", right: "0" }}
                required
              />
            </div>
            <Button
              disabled={loading}
              size="small"
              variant="contained"
              color="warning"
              type="submit"
              style={{
                width: "60%",
                marginTop: "2rem",
                marginBottom: "0.5rem",
              }}
            >
              Next
            </Button>
          </form>
          <p style={{ margin: "0", textAlign: "center" }}>
            Already Registered?<Link to="/login"> Log In</Link>
          </p>
        </Container>
      </div>
    </div>
  );
};

export default Signup;
