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
import Spinner from "../../Components/Spinner/Spinner";

import jwt_decode from "jwt-decode";
import logo from "../../Assets/Acharya_logo.png";
import taxi from "../../Assets/taxi.png";
import { toast } from "react-toastify";
import PlacementLogo from "../../Components/Logo/PlacementLogo";
import constants from "../../Constants";
import Spinner from "../../Components/Spinner/Spinner";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { signup } = authContext;
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const [random_quote] = useState(constants.RANDOM_QUOTE());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      return toast.error("Passwords Do Not Match!");
    }
    try {
      setLoading(true);
      let response = await signup(
        credentials.email,
        credentials.password,
        credentials.firstName,
        credentials.lastName
      );
      if (response.data) {
        toast.success("Signup Successful! Check your email to verify your account.", {
          position: "bottom-center",
          theme: "colored",
        });
        navigate("/login");
      } else {
        response =response.response;
        toast.error(typeof response.data.error === "object" ? response.data.error.message ||  response.data.error.code : response.data.error , {
          position: "bottom-center",
          theme: "colored",
        });
      }
    } catch(err) {
      console.log(err)
      toast.error("Failed to create an account!", {
        position: "bottom-center",
        theme: "colored",
      });
    }
    setLoading(false);
  };

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
             <div style={{display: "flex",alignItems: "center", textAlign: "center", verticalAlign: "center"}}>
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
            {loading && <Spinner />}
            </div>
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

export default Signup;
