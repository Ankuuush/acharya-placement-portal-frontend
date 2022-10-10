import React, { useContext, useEffect, useRef, useState } from "react";
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
import AuthContext from "../../../Context/AuthContext/AuthContext.js";
import { toast } from "react-toastify";


const PersonalInformationItem = ({personalInfo,setPersonalInfo,handleSubmit}) => {
  const authContext = useContext(AuthContext);
  const { currentUser } = authContext;
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
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
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
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
        toast.error("Server Error!");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPersonalInfo({ ...personalInfo, photoUrl: downloadURL });
          toast.success("Profile Picture Uploaded!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
            hideProgressBar: true,
          });
        });
      }
    );
  };

  const handleSubmitBut=(e)=>{
    e.preventDefault()
    setLoading(true)
    if(handleSubmit()) setLoading(false)
  }

  useEffect(() => {
    const displayName = currentUser.displayName.split(" ");
    const firstName = displayName[0];
    let lastName = "";
    for (let i = 1; i < displayName.length; i++)
      lastName += displayName[i] + " ";
    setUserData({
      firstName: firstName,
      lastName: lastName,
      email: currentUser.email,
    });
  }, [currentUser]);

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
        onSubmit={handleSubmitBut}
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
            value={userData.firstName}
            size="normal"
            type="text"
            variant="outlined"
            style={{ width: "48%", margin: "0.35rem 0" }}
            disabled
          />
          <TextField
            name="lastName"
            value={userData.lastName}
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
          value={userData.email}
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
          required
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
          Next
        </Button>
      </form>
    </div>
  );
};

export default PersonalInformationItem;
