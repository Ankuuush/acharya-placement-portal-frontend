import React, { useState } from 'react'
import { toast } from 'react-toastify';
import api from '../../api';
import { TextField } from '@mui/material';
import Spinner from '../../Components/Spinner/Spinner';

const AddTpo = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      return toast.error("Passwords Do Not Match!");
    }
    
      setLoading(true);
      api.post('/admin/addTpo',{
        email:credentials.email,
        password:credentials.password,
        firstName:credentials.firstName,
        lastName:credentials.lastName
      }).then(()=>{
        setCredentials({email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",})
        toast.success("Tpo added!!")
      })
    .catch ((err) =>{
      console.log(err);
      toast.error("Failed to create an account!", {
        position: "bottom-center",
        theme: "colored",
      });
    })
    setLoading(false);
  };

  return (
    <div >
      <h2>Add a TPO</h2>
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection:"column",
        boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
        padding: 30,
        background: "white",
        borderRadius: 15,
        width:"50%",
        margin:"2rem auto"
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
    </div>
  );
};


export default AddTpo