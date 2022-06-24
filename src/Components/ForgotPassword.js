import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Container,
  TextField,
  Avatar,
  Alert,
} from "@mui/material";

import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);
  const { resetPassword } = authContext;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('')
  const onChange = (e) => {
    setEmail(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setMessage('')
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your email for further instructions.")
    } catch {
      setError("Failed to reset password.");
    }
    setLoading(false);
  };

  return (
    <Container style={{ width: "25rem", marginTop: "5rem" }}>
      <Avatar
        sx={{ bgcolor: "#F86528", width: 48, height: 48 }}
        style={{ bottom: "-1.5rem", margin: "0 auto" }}
        src=".../Assets/avatar.png"
      />
      <Card variant="outlined">
        <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Reset Password</h2>
        <Container style={{ width: "20rem", marginTop: "2rem" }}>
          {error && (
            <Alert style={{ marginBottom: "1rem" }} severity="error">
              {error}
            </Alert>
          )}
          {message &&(
            <Alert style={{ marginBottom: "1rem" }} severity="info">
            {message}
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
              value={email}
              size="small"
              label="Email"
              variant="outlined"
              type="email"
              style={{ width: "100%", margin: "0.35rem 0" }}
              required
            />
            <Button
              disabled={loading}
              size="small"
              variant="contained"
              color="warning"
              type="submit"
              style={{ width: "80%", marginTop: "2rem" }}
            >
              Submit
            </Button>
            <Link to="/Login" style={{marginTop:'1rem', marginBottom: "3rem"}}>Login</Link>
          </form>
        </Container>
      </Card>
      <p style={{ margin: "0", textAlign: "end" }}>
        Don't have an account?<Link to="/signup"> Sign Up</Link>
      </p>
    </Container>
  );
};

export default ForgotPassword;
