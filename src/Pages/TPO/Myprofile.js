import { Button, TextField, Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState, useRef, useContext } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import Spinner from "../../Components/Spinner/Spinner";
import { CameraAlt } from "@mui/icons-material";
import AuthContext from "../../Context/AuthContext/AuthContext";

const Myprofile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const context=useContext(AuthContext)
  const {token}=context

  const ref = useRef(null);
  const onClick = (e) => {
    ref.current.click();
  };

  useEffect(() => {
    getTpoProfile();
  }, []);

  const [uploading, setUploading] = useState(false);
  const handleChange = async (e) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("scope", "profile_picture");
    formData.append("file", e.target.files[0]);
    api
      .post(`/${token.account}/upload`, formData)
      .then((res) => {
        setProfile({ ...profile, photoUrl: res.data.data.location });
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

  const getTpoProfile = () => {
    api.get(`/${token.account}/profile`).then((response) => {
      setProfile(response.data.data.profile);
      setLoading(false);
    });
  };

  const onChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveTpoProfile = () => {
    api.post(`/${token.account}/profile`, {
        firstName: profile.firstName,
        lastName: profile.lastName,
        contactNumber: profile.contactNumber || undefined,
        photoUrl: profile.photoUrl || undefined,
    }).then((response) => {
      setProfile(response.data.data.profile);
        toast.success("Profile Updated!")
    });
  };

  return (
    <div style={{ padding: 30 }}>
      <h3>My Profile</h3>
      {loading ? (
        <Spinner />
      ) : (
        <Box
          sx={{
            width: "100%",
            background: "white",
            borderRadius: 1,
            marginTop: 2,
            padding: 4,
            textAlign: "center",
            alignContent: "center",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
            <div style={{display: "flex", justifyContent: "center"}}>
            <p style={{marginBottom: 15, color: "#1F347D", fontWeight: 'bolder', padding: "5px 10px", borderRadius: 4, background: "#EBEEF9", width: 'fit-content'}}>{profile.authorityMeta.department} {profile.role.toUpperCase()}</p>
            </div>
          <input
            name="Profile Picture"
            ref={ref}
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
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
              marginBottom: 20,
            }}
          >
            {uploading ? (
              <CircularProgress />
            ) : (
              <div>
                {!profile.photoUrl ? (
                  <CameraAlt style={{ color: "white" }} />
                ) : (
                  <img
                    src={profile.photoUrl+"?randome="+Date.now()}
                    alt="Profile"
                    key={Date.now()}
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
              </div>
            )}
          </div>
          </div>
          <TextField
            name="firstName"
            value={profile.firstName}
            size="normal"
            type="text"
            placeholder="First Name"
            variant="outlined"
            onChange={onChange}
            style={{ width: "45%", margin: "0.35rem 0", marginRight: "2.5%", marginBottom: 20 }}
          />
          <TextField
            name="lastName"
            value={profile.lastName}
            size="normal"
            placeholder="Last Name"
            type="text"
            variant="outlined"
            onChange={onChange}
            style={{
              width: "45%",
              margin: "0.35rem 0",
              marginBottom: 20
            }}
          />
          <TextField
            name="contactNumber"
            value={profile.contactNumber}
            size="normal"
            type="text"
            variant="outlined"
            placeholder="Contact Number"
            onChange={onChange}
            style={{
              width: "45%",
              margin: "0.35rem 0",
              marginRight: "2.5%"
            }}
          />
          <TextField
            name="email"
            value={profile.email}
            size="normal"
            type="text"
            variant="outlined"
            placeholder="Contact Number"
            style={{
              width: "45%",
              margin: "0.35rem 0",
            }}
            disabled
          />
          <br/>
          <p style={{marginTop: 15, opacity: 0.7}}>This account was created on {new Date(profile.createdOn).toLocaleString()}</p>

<Button
          disabled={loading}
          size="large"
          onClick={saveTpoProfile}
          variant="contained"
          color="warning"
          type="submit"
          style={{
            position: "relative",
            marginTop: "1.5rem",
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
            padding: "0.5rem",
            width: "38%",
            textTransform: "none"
          }}
        >
          Save Profile
        </Button>
        </Box>
      )}
    </div>
  );
};

export default Myprofile;
