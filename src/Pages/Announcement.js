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
      <p>
        This is a place where you can see all the notices posted by your department's TPO
      </p>
      <div style={{display: "flex", marginTop: 20, flexWrap: "wrap"}}>
        {announcements.map((announcement) => (
            <div className="announcement-item" style={{background: "white", padding: 15, marginRight: 15, borderRadius: 10, flex: "1 0 30%", marginTop: 15, width: "fit-content"}}>
                <h4 className="announcement-title">{announcement.title}</h4>
                <p className="announcement-description" style={{marginTop: 5}}>{announcement.description}</p>
                <p style={{fontSize: 12, marginTop: 5, opacity: 0.6}}>{`${new Date(announcement.date).toLocaleString()} by ${announcement.createdBy.firstName}`}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
