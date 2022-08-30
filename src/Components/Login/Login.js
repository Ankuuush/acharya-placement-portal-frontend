import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Container,
  TextField,
  Avatar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/AuthContext";

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

  return (
    <Container style={{ width: "25rem", marginTop: "3rem" }}>
      <Avatar
        sx={{ bgcolor: "#F86528", width: 48, height: 48 }}
        style={{ bottom: "-1.5rem", margin: "0 auto" }}
        src=".../Assets/avatar.png"
      />
      <Card variant="outlined">
        <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Log In</h2>
        <Container style={{ width: "20rem", marginTop: "2rem" }}>
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
            <Link to="/forgot-password" style={{marginTop:'1rem', marginBottom: "3rem"}}>Forgot Password?</Link>
          </form>
        </Container>
      </Card>
      <p style={{ margin: "0", textAlign: "end" }}>
        Don't have an account?<Link to="/signup"> Sign Up</Link>
      </p>
    </Container>
  );
};

export default Login;
