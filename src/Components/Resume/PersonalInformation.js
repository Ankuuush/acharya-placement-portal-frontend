import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import PersonalInformationItem from "../ProfileForm/Personal Information/PersonalInformationItem";
import FormatDate from "../Items/FormatDate";
import ModalComponent from "../ModalComponent";
import FeatherIcon from "feather-icons-react";
import "./index.css"

const PersonalInformation = ({ data, setData }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const [personalInfo, setPersonalInfo] = useState(data);
  const handleSubmit = () => {
    api
      .post("/student/profile/basic", {
        photoUrl: personalInfo.photoUrl,
        phone: personalInfo.phone,
        gender: personalInfo.gender,
        dob: personalInfo.dob,
      })
      .then((response) => {
        const res = response.data.data.profile.basicDetails;
        const newDob = FormatDate(res.dob);
        console.log(newDob);
        setData({ ...data, ...res, dob: newDob });
        toast.success("Data saved!");
        setOpen(false);
        return false;
      })
      .catch(() => {
        toast.error("Server Error!");
        return true;
      });
  };
  useEffect(() => {
    setPersonalInfo(data);
  }, [data]);

  return (
    <>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        component={
          <PersonalInformationItem
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            handleSubmit={handleSubmit}
          />
        }
      />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
       <div  style={{ display: "flex", flexDirection: "row" }}>
       <img
          src={data?.photoUrl}
          alt="Profile Picture"
          style={{ width: "7.5rem", height: "7.5rem", borderRadius: "1000px" }}
        />
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignContent: "center" }}>
                <div style={{ paddingLeft: "1rem", color: "#2b2b2b", fontSize: 22 }}>
                  <h3>{data?.firstName}</h3>
                </div>
                <div style={{ paddingLeft: "0.5rem", color: "#2b2b2b", fontSize: 22  }}>
                  <h3>{data?.lastName}</h3>
                </div>
              </div>
            </div>
          </div>

          <div style={{paddingLeft: "1rem"}}>
          <div className="flex-tie">
          <FeatherIcon
                icon="mail"
                size={17}
                color="#1f357e"
                style={{ marginRight: 7 }}
              />
          <div style={{ color: "#1f357e" }}>{data?.email}</div>
          </div>
          <div className="flex-tie">
          <FeatherIcon
                icon="user"
                size={17}
                style={{ marginRight: 7 }}
              />
                    <div>{data?.usn} ({data?.studentMeta.department})</div>
          </div>
          <div className="flex-tie">
          <FeatherIcon
                icon="phone"
                size={17}
                style={{ marginRight: 7 }}
              />
                    <div>{data?.phone}</div>
          </div>

         

          </div>
        </div>
       </div>
        <FeatherIcon
                icon="edit-2"
                onClick={handleClick}
                style={{ cursor: "pointer" }}
              />
      </div>
      <div style={{ paddingTop: "0.5rem" }}>
        <hr className="job-hr" />
      </div>
    </>
  );
};

export default PersonalInformation;
