import { Box, Button, TextField } from "@mui/material";
import React from "react";
import NavBar from "../Components/navbar";
import Ratings from "../Components/Rating";
import { toast } from "react-toastify";

const FeedBack = () => {
  const handleSend=(e)=>{
    e.preventDefault()
    toast.success("Thanks for your feedback!!")
  }
  return (
    <div>
      <h1>Feedback</h1>
    <div
      style={{
        display: "flex",
        boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
        padding: 20,
        background: "white",
        borderRadius: 15,
        width: "60%",
        margin: "2rem auto",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
      }}
    >
      <div style={{ width: "55%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center" }}>
        <h4 style={{marginBottom:"2rem"}}>Your feedback is important to us.</h4>
        <form
        onSubmit={handleSend}
        style={{width:"100%",height:"fit-content", display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
        <Ratings />
        <TextField
          name="message"
          // onChange={onChange}
          // value={postJob.additionalInfo}
          size="normal"
          label="Please write us a message."
          type="text"
          multiline
          minRows={2}
          variant="outlined"
          style={{ width: "100%", margin: "1rem 0" }}
          required
        />
        <Button
          size="large"
          variant="contained"
          color="warning"
          type="submit"
          style={{
            width: "60%",
            position: "relative",
            marginTop: "1rem",
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
            padding: "0.5rem",
          }}
        >
          Send
        </Button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default FeedBack;
