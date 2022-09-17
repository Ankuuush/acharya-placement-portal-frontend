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
import api from "../../api.js";

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
    try {
      const response=await api
        .post("/student/profile/basic", {
          photoUrl: personalInfo.photoUrl,
          phone: personalInfo.phone,
          gender: personalInfo.gender,
          //   branch: personalInfo.branch,
          usn: personalInfo.usn,
          dob: personalInfo.dob,
        })
        .then((response) => response);
      console.log(response);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }

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
