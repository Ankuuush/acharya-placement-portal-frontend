import React, { useContext, useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/AuthContext";
import "../../Styles/LoginSignUp.css";
import jwt_decode from "jwt-decode";
import logo from "../../Assets/Acharya_logo.png";
import taxi from "../../Assets/taxi.png";
import { toast } from "react-toastify";
import PlacementLogo from "../../Components/Logo/PlacementLogo";
import constants from "../../Constants";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const authContext = useContext(AuthContext);
  const { login, logout } = authContext;
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await login(credentials.email, credentials.password);
      console.log(response);
      const token = jwt_decode(String(response.user.accessToken));
      if (token.email_verified) {
        toast.success("Login Successful!");
        navigate(from, { replace: true });
      } else {
        await logout();
        navigate("/verify-email");
      }
    } catch {
      toast.error("Login Failed!");
    }
    setLoading(false);
  };

  const random_quote = constants.RANDOM_QUOTE();

  return (
    <div id="login-signup-container">
      <div id="right-component">
        <div className="quote-component">
        <h3>{random_quote.text}</h3>
          <p>-{random_quote.author}</p>
        </div>
        <img src={taxi} alt="taxi" height={520} className="display-vector" />
      </div>
      <div id="left-component">
      <Container style={{ width: "90%", margin: 0, padding: "20px 20px" }}>
      <PlacementLogo />
      
        <div className="login-form">
        <h2 className="login-header">
        Let's Get You Registered!
      </h2>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
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
            
            <button
              disabled={loading}
              size="large"
              variant="contained"
              color="warning"
              type="submit"
              style={{
                width: "60%",
                marginTop: "1.5rem",
                marginBottom: "0.5rem",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: 5,
                fontSize: 20,
                backgroundColor: "#f1922e",
                color: "white",
                cursor: "pointer",
              }}
            >
              Next
            </button>
          </form>
          <div className="prompts">
            <p className="prompt-tags">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#4A75B5", textDecoration: "none" }}
              >
                Login Here.
              </Link>
            </p>
          </div>
        </div>
      </Container>
      </div>
    </div>
  );
};

export default Login;
