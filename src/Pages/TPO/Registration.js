import React from "react";
import SignupForm from "../SignUp/SignupForm";

const Registration = () => {
  return (
    <div style={{ width: "50%",
    boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
    padding: 20,
    background: "white",
    borderRadius: 15,
    margin:"2rem auto" }}>
      <h3>Register Student</h3>
      <SignupForm toastText={"Student Registeration Successful!!"}/>
    </div>
  );
};

export default Registration;
