import React, { useEffect, useState } from "react";
import api from "../api";

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

  const getAllAnnouncements = () => {
    api.get("/student/drives/announcements/all/sorted").then((response) => {
      setAnnouncements(response.data.data.announcements.reverse());
      setLoading(false);
    });
  };

  return (
    <div style={{ padding: 15 }}>
      <p className="search-header">Notice Board</p>
      <div style={{display: "flex", marginTop: 10, flexWrap: "wrap"}}>
        {announcements.map((announcement) => (
            <div className="announcement-item" style={{background: "white", padding: 15, marginRight: 15, borderRadius: 10, flex: "1 0 30%", marginTop: 15, width: "fit-content", boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px", borderTop: "4px solid #E0E0E0"}}>
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
