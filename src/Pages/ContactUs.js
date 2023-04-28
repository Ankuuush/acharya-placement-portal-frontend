import { Button, TextField } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";

const ContactUs = () => {
  const handleSend=(e)=>{
    e.preventDefault()
    toast.success("Thank you for contacting us!!")
  }
  return (
    <div>
      <h1>Contact Us</h1>
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
      <h4>Have any doubt? Feel free to contact us.</h4>
        <form onSubmit={handleSend} style={{ width: "70%",height:"fit-content",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
          <div style={{display:"flex",justifyContent:"space-between"}}>
            
        <TextField
          name="message"
          // onChange={onChange}
          // value={postJob.additionalInfo}
          size="normal"
          label="First Name"
          type="text"
          variant="outlined"
          style={{ width: "48%", margin: "1rem 0" }}
          required
          />
        <TextField
          name="message"
          // onChange={onChange}
          // value={postJob.additionalInfo}
          size="normal"
          label="Last Name"
          type="text"
          variant="outlined"
          style={{ width: "48%", margin: "1rem 0" }}
          required
          />
          </div>
        <TextField
          name="message"
          // onChange={onChange}
          // value={postJob.additionalInfo}
          size="normal"
          label="Email"
          type="email"
          variant="outlined"
          style={{ width: "100%", margin: "1rem 0" }}
          required
        />
        <TextField
          name="phoneNo"
          // onChange={onChange}
          // value={postJob.additionalInfo}
          size="normal"
          label="Phone No."
          type="tel"
          pattern="[0-9]{10}"
          variant="outlined"
          style={{ width: "100%", margin: "1rem 0" }}
        />
        <TextField
          name="message"
          // onChange={onChange}
          // value={postJob.additionalInfo}
          size="normal"
          label="Message"
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
  );
};

export default ContactUs;
