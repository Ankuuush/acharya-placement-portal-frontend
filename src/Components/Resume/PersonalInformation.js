import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import PersonalInformationItem from "../ProfileForm/Personal Information/PersonalInformationItem";
import FormatDate from "../Items/FormatDate";
import ModalComponent from "../ModalComponent";

const PersonalInformation = ({ data, setData }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const [personalInfo, setPersonalInfo] = useState(data)
  const handleSubmit = () => {
    api
      .post("/student/profile/basic", {
        photoUrl: personalInfo.photoUrl,
        phone: personalInfo.phone,
        gender: personalInfo.gender,
        usn: personalInfo.usn,
        dob: personalInfo.dob,
      })
      .then((response) => {
        const res=response.data.data.profile.basicDetails
        const newDob=FormatDate(res.dob)
        console.log(newDob)
        setData({...data,...res,dob:newDob});
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
    setPersonalInfo(data)
  }, [data])
  
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
      <h3>Personal Info</h3>
      <img
        src={data?.photoUrl}
        alt="Profile Picture"
        style={{ width: "5rem", height: "5rem" }}
      />
      <div>{data?.gender}</div>
      <div>{data?.firstName}</div>
      <div>{data?.lastName}</div>
      <div>{data?.email}</div>
      <div>{data?.dob}</div>
      <div>{data?.phone}</div>
      <button onClick={handleClick}>Edit</button>
    </>
  );
};

export default PersonalInformation;
