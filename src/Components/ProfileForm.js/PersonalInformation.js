import React, { useRef, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  getStorage,
  ref as firebaseRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const PersonalInformation = () => {

  const storage = getStorage();
  const ref = useRef(null);
  const onClick = (e) => {
    ref.current.click();
  };
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const handleChange = async (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };
  const [personalInfo, setPersonalInfo] = useState({
    photoUrl: "",
    phone: "",
    gender: "",
    branch: "",
    usn: "",
    dob: "",
  });
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const onChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`https://${baseUrl}/student/profile/basic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVkNmJjOWRhMWFmMjM2ZjhlYTU2YTVkNjIyMzQwMWZmNGUwODdmMTEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQW5rdXNoIEt1bWFyIiwiYWNjb3VudCI6InN0dWRlbnQiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWNoYXJ5YS1wbGFjZW1lbnQtcG9ydGFsIiwiYXVkIjoiYWNoYXJ5YS1wbGFjZW1lbnQtcG9ydGFsIiwiYXV0aF90aW1lIjoxNjYyOTA2MzAwLCJ1c2VyX2lkIjoiSmx1Rk1taGxKNVVOT2hZcmp0Q3ZoSmJ1M09JMiIsInN1YiI6IkpsdUZNbWhsSjVVTk9oWXJqdEN2aEpidTNPSTIiLCJpYXQiOjE2NjMwMDA4MzAsImV4cCI6MTY2MzAwNDQzMCwiZW1haWwiOiJhbmt1c2hrLjE5LmJlaXNAYWNoYXJ5YS5hYy5pbiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFua3VzaGsuMTkuYmVpc0BhY2hhcnlhLmFjLmluIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.sQ98TRJD4iYmjyzfjiehLAG1Nufe6oFrpA2uKX3kJH8IWgJCV828zG1y_cbwOQeIDMIM8dc3OgMoUUJ2EloychkOEhbY4SXx0Nt2pVIg_zGUELesbNh579roU13_T4lRpNB39RFQB8SM3PbtBjnUwm5KFh0RGXK3c3QpIjSiahiENHfKhffm3LjmwaNw9pq20N2SsnAUudQoJQqO0pNAhIbkRRm54KQeB_V02sUn7qhqAsK9yR3kYwYpGgFarexCac4iB-gxpluEPbxkYB8GXCqGs3jJgffh9J-zd_1N1UQKvanhp7TP07pBIGtQC8YgN8Kb6vdxKqkH0eqCYNzKsw",
      },
      body: JSON.stringify({
        photoUrl: personalInfo.photoUrl,
        phone: personalInfo.phone,
        gender: personalInfo.gender,
        //   branch: personalInfo.branch,
        usn: personalInfo.usn,
        dob: personalInfo.dob,
      }),
    });
    console.log(response);
    setLoading(false);
  };

  const handleUpload = () => {
    setUploaded(true);
    const metadata = {
      contentType: "image/jpeg",
    };

    const storageRef = firebaseRef(storage, "images/" + profileImage.name);
    const uploadTask = uploadBytesResumable(storageRef, profileImage, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            console.log("User canceled the upload");
            break;
          case "storage/unknown":
            console.log("Unknown error occurred, inspect error.serverResponse");
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPersonalInfo({ ...personalInfo, photoUrl: downloadURL });
        });
      }
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "30em",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "3em",
      }}
    >
      <input
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
        }}
      >
        <CameraAltIcon style={{ color: "white" }} />
      </div>
      <Button
        size="small"
        variant="contained"
        style={{
          display: uploaded ? "none" : "",
          width: "20%",
          margin: "0.5em",
        }}
        onClick={handleUpload}
      >
        Upload
      </Button>
      <progress
        style={{
          display: !uploaded ? "none" : "",
          width: "20%",
          margin: "0.5em",
        }}
        value={progress}
        max="100"
      />
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80%",
        }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <TextField
            name="firstName"
            value="Ankush"
            size="normal"
            type="text"
            variant="outlined"
            style={{ width: "48%", margin: "0.35rem 0" }}
            disabled
          />
          <TextField
            name="lastName"
            value="Kumar"
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
          value="ankushk@acharya.ac.in"
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
          required
        />
        <TextField
          name="phone"
          onChange={onChange}
          value={personalInfo.phone}
          size="normal"
          label="Phone No."
          type="text"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />

        <Button
          disabled={loading}
          size="large"
          variant="contained"
          color="warning"
          type="submit"
          style={{
            width: "60%",
            marginTop: "2rem",
            marginBottom: "0.5rem",
          }}
        >
          Next
        </Button>
      </form>
    </div>
  );
};

export default PersonalInformation;
