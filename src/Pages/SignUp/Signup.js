import React, { useContext, useState } from "react";
import { Button, Container, TextField, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/AuthContext";
import "../../Styles/LoginSignUp.css";

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
  const { signup } = authContext;
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
      if (response.data.success) {
        alert("Please verify your email and then login to continue!!");
        navigate("/login");
      } else {
        setError("Failed to create an account now");
      }
    } catch {
      setError("Failed to create an account then");
    }
    setLoading(false);
  };

  return (
    <div id="login-signup-container">
      <div id="left-component">
        <img
          src="https://research.collegeboard.org/media/2022-02/iStock_000021255451_Large-780x585.jpg"
          alt="left component"
          width="120%"
          height="100%"
        />
      </div>
      <div id="right-component">
        <h2 style={{ textAlign: "center", marginTop: "7rem" }}>
          Let's Get You Registered!
        </h2>
        <Container style={{ width: "70%", marginTop: "2rem" }}>
          
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
              size="normal"
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
              size="normal"
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
                size="normal"
                label="First Name"
                type="text"
                variant="outlined"
                style={{ width: "48%", margin: "0.35rem 0" }}
                required
              />
              <TextField
                name="lastName"
                onChange={onChange}
                value={credentials.lastName}
                size="normal"
                label="Last Name"
                type="text"
                variant="outlined"
                style={{
                  width: "48%",
                  position: "absolute",
                  right: "0",
                  margin: "0.35rem 0",
                }}
                required
              />
            </div>
            {error && (
            <Alert style={{ margin: "0.35rem 0", width:"90%" }} severity="error">
              {error}
            </Alert>
          )}
            <Button
              disabled={loading}
              size="large"
              variant="contained"
              color="warning"
              type="submit"
              style={{
                width: "60%",
                marginTop: "1.5rem",
                marginBottom: "0.5rem",
              }}
            >
              Next
            </Button>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default Signup;
