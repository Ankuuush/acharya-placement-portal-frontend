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
     <div style={{display:"flex", flexDirection:"row"}}>
      <img 
        src={data?.photoUrl}
        alt="Profile Picture"
        style={{ width: "6.5rem", height: "6.5rem" , borderRadius:"8rem"}}
      />  
      <div style={{display:"flex", flexDirection:"column"}}>
      <div style={{display:"flex", flexDirection:"row"}}>
      <div style={{paddingLeft:"1rem"}}><h3>{data?.firstName}</h3></div>
      <div style={{paddingLeft:"0.5rem"}}><h3>{data?.lastName}</h3></div>
      <div style={{display:"flex", flexDirection:"row", paddingLeft:"44rem"}}>
      <button onClick={handleClick}>Edit</button>
      </div>
      </div> 
      
      <div style={{paddingLeft:"1rem"}}>{data?.email}</div>
      <div style={{paddingLeft:"1rem"}}>{data?.dob}</div>
      <div style={{paddingLeft:"1rem"}}>{data?.phone}</div>
      </div>
      </div>
      <div style={{paddingTop:"0.5rem"}}>
        <hr className="job-hr"/>
      </div>
      
      
      
      
    </>
  );
};

export default PersonalInformation;
