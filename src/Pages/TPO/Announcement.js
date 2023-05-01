import React, { useEffect, useState } from "react";
import api from "../../api";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAnnouncements();
    const interval = setInterval(() => {
        getAllAnnouncements();
    }, 10000);

    return () => {
      return clearInterval(interval);
    };
  }, []);

  const [notice, setNotice] = useState({
    title: "",
    description: "",
    batch: "",
  });

  const onChange = (e) => {
    setNotice({ ...notice, [e.target.name]: e.target.value });
  };

  const getAllAnnouncements = () => {
    api.get("/tpo/announcements/all/sorted").then((response) => {
      setAnnouncements(response.data.data.announcements.reverse());
      setLoading(false);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    api.post("/tpo/notice", {
        title: notice.title,
        description: notice.description,
        batch: Number(notice.batch),
    }).then((response) => {
        toast.success("Notice Posted Successfully")
        getAllAnnouncements();
        setLoading(false);
    }).catch((error) => {
        toast.error("Error Posting Notice")
    })
  };

  return (
    <div style={{ padding: 15 }}>
      <p className="search-header">Notice Board</p>
      <p>
        This is a place where you can post notices to the batch students
        directly, they will instantly see this announcement on the web app and
        receive notifications on their mobile devices
      </p>
      <div style={{ position: "relative", width: "100%", padding: 20, background: "white", marginTop: 20 }}>
      <p className="search-header">Add a New Notice</p>
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          onChange={onChange}
          value={notice.title}
          size="normal"
          label="Notice Title"
          type="text"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <TextField
          name="description"
          onChange={onChange}
          value={notice.description}
          size="normal"
          label="Notice Description"
          type="text"
          multiline
          variant="outlined"
          style={{
            width: "100%",
            right: "0",
            margin: "0.35rem 0",
          }}
          required
          rows={3}
        />
        <TextField
          name="batch"
          onChange={onChange}
          value={notice.batch}
          size="normal"
          label="Batch To Send Notification To"
          type="text"
          variant="outlined"
          style={{
            width: "100%",
            right: "0",
            margin: "0.35rem 0",
          }}
          required
        />
        <button
          disabled={loading}
          size="large"
          variant="contained"
          color="warning"
          type="submit"
          style={{
            width: "30%",
            marginTop: "1.5rem",
            marginBottom: "0.5rem",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: 5,
            fontSize: 20,
            backgroundColor: "#f1922e",
            color: "white",
            cursor: "pointer",
          }}
        >
          Post Notice
        </button>
        </form>
      </div>

      <p className="search-header" style={{marginTop: 20}}>Past Notices</p>
      <div style={{display: "flex", marginTop: 10, flexWrap: "wrap"}}>
        {announcements.map((announcement) => (
            <div className="announcement-item" style={{background: "white", padding: 15, marginRight: 15, borderRadius: 10, flex: "1 0 30%", marginTop: 15, width: "fit-content"}}>
              <div style={{display: "flex", alignItems: "center", marginBottom: 9}}>
                  <img src={announcement.createdBy.photoUrl || "https://acharyaplacement-dev.s3.ap-south-1.amazonaws.com/public/random/blank-profile-picture-973460__340.webp"} alt="profile" style={{width: 22, height: 22, borderRadius: "50%", marginRight: 7}} />
                <p style={{fontSize: 12, opacity: 0.6}}>{`${new Date(announcement.date).toLocaleString()} by ${announcement.createdBy.firstName}`}</p>
                </div>
                <h4 className="announcement-title">{announcement.title}</h4>
                <p className="announcement-description" style={{marginTop: 5}}>{announcement.description}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
