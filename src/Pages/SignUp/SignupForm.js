import React, { useContext, useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import Spinner from "../../Components/Spinner/Spinner";

const SignupForm = ({toastText,userSignup}) => {
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
        toast.success(
          toastText,
          {
            position: "bottom-center",
            theme: "colored",
          }
        );
        if(userSignup)
        navigate("/login");
        else{
          setCredentials({
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
          })
        }
      } else {
        response = response.response;
        toast.error(
          typeof response.data.error === "object"
            ? response.data.error.message || response.data.error.code
            : response.data.error,
          {
            position: "bottom-center",
            theme: "colored",
          }
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create an account!", {
        position: "bottom-center",
        theme: "colored",
      });
    }
    setLoading(false);
  };

  return (
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
        value={credentials.confirmPassword}
        size="normal"
        label="Confirm Password"
        type="password"
        variant="outlined"
        style={{ width: "100%", margin: "0.35rem 0" }}
        required
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          verticalAlign: "center",
        }}
      >
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
  );
};

export default SignupForm;
