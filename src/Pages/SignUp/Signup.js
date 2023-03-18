import React, { useState } from "react";
import {  Container} from "@mui/material";
import { Link } from "react-router-dom";
import "../../Styles/LoginSignUp.css";
import taxi from "../../Assets/taxi.png";
import PlacementLogo from "../../Components/Logo/PlacementLogo";
import constants from "../../Constants";
import SignupForm from './SignupForm'

const Signup = () => {
    const [random_quote] = useState(constants.RANDOM_QUOTE());
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
        <SignupForm toastText={"Signup Successful! Check your email to verify your account."} userSignup={true} />
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
  )
}

export default Signup