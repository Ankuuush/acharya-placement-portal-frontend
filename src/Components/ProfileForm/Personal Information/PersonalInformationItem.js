import React, { useRef, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import api from "../../../api";

const PersonalInformationItem = ({
  personalInfo,
  setPersonalInfo,
  handleSubmit,
}) => {
  const ref = useRef(null);
  const onClick = (e) => {
    ref.current.click();
  };
  const [uploading, setUploading] = useState(false);
  const handleChange = async (e) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("scope", "profile_picture");
    formData.append("file", e.target.files[0]);
    api
      .post("/student/upload", formData)
      .then((res) => {
        setPersonalInfo({ ...personalInfo, photoUrl: res.data.data.location });
        toast.success("Profile Picture Uploaded!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
          hideProgressBar: true,
        });
        setUploading(false);
      })
      .catch((err) => {
        toast.error("Server Error!");
        setUploading(false);
      });
  };
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleUpload = () => {};

  const handleSubmitBut = (e) => {
    e.preventDefault();
    setLoading(true);
    if (handleSubmit()) setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "30em",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3 style={{marginBottom: 30}}>Personal Details</h3>
      <input
        name="Profile Picture"
        ref={ref}
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        onChange={handleChange}
        required
      />
      <div
        onClick={onClick}
        style={{
          width: "6em",
          height: "6em",
          borderRadius: "3em",
          background: "rgba(0, 0, 0, 0.36)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          marginBottom: 20
        }}
      >
        {uploading ? (
          <CircularProgress />
        ) : <div>
          {!personalInfo.photoUrl ? (
          <CameraAltIcon style={{ color: "white" }} />
        ) : (
          <img
            src={personalInfo.photoUrl}
            alt="Profile"
            style={{
              width: "6em",
              height: "6em",
              borderRadius: "3em",
              background: "rgba(0, 0, 0, 0.36)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          />
        )}
          </div>} 
        
      </div>
      <form
        onSubmit={handleSubmitBut}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <TextField
            name="firstName"
            value={personalInfo.firstName}
            size="normal"
            type="text"
            variant="outlined"
            style={{ width: "48%", margin: "0.35rem 0" }}
            disabled
          />
          <TextField
            name="lastName"
            value={personalInfo.lastName}
            size="normal"
            type="text"
            variant="outlined"
            style={{
              width: "48%",
              position: "absolute",
              right: "0",
              margin: "0.35rem 0",
            }}
            disabled
          />
        </div>
        <TextField
          name="email"
          value={personalInfo.email}
          size="normal"
          variant="outlined"
          type="email"
          style={{ width: "100%", margin: "0.35rem 0" }}
          disabled
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ width: "48%", margin: "0.35rem 0" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                name="gender"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={personalInfo.gender}
                label="Gender"
                onChange={onChange}
                required
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField
            name="dob"
            onChange={onChange}
            value={personalInfo.dob}
            size="normal"
            //   label="DOB"
            type="date"
            variant="outlined"
            style={{ width: "48%", margin: "0.35rem 0" }}
            required
          />
        </div>
        <TextField
          name="usn"
          onChange={onChange}
          value={personalInfo.usn}
          size="normal"
          label="USN"
          type="text"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <TextField
          name="branch"
          onChange={onChange}
          value={personalInfo.branch}
          size="normal"
          label="Branch"
          type="text"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          disabled
        />
        <TextField
          name="phone"
          onChange={onChange}
          value={personalInfo.phone}
          size="normal"
          label="Phone No."
          type="tel"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          inputProps={{ minLength: 10, maxLength: 10 }}
          required
        />

        <Button
          disabled={loading}
          size="large"
          variant="contained"
          color="warning"
          type="submit"
          style={{
            position: "relative",
            marginTop: "1rem",
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
            padding: "0.5rem",
            width: "48%",
          }}
        >
          Save & Next
        </Button>
      </form>
    </div>
  );
};

export default PersonalInformationItem;
