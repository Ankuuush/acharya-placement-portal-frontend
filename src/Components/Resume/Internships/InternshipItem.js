import React, { useState } from "react";
import InternshipItem from "../../ProfileForm/Internship Experience/internshipItem";
import { toast } from "react-toastify";
import api from "../../../api";
import Modal from "../../ModalComponent";

const ResumeInternshipItem = ({ item, setData, showModal }) => {
  const [childOpen, setChildOpen] = useState(false);
  const [internships, setInternships] = useState(item);
  const handleClick = () => {
    setChildOpen(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .patch(`/student/profile/internships/${item._id}`, {
        companyName: internships.companyName,
        startMonth: internships.startMonth,
        startYear: parseInt(internships.startYear),
        endMonth: internships.endMonth,
        endYear: parseInt(internships.endYear),
        ongoing: internships.ongoing,
        description: internships.description,
        role: internships.role,
      })
      .then((response) => {
        setData(response.data.data.doc.internshipDetails);
        toast.success("Data saved!");
        setChildOpen(false);
      })
      .catch(() => {
        toast.error("Server Error!");
      });
  };

  const handleDelete=()=>{
    api
      .delete(`/student/profile/internships/${item._id}`)
      .then((response) => {
        setData(response.data.data.doc.internshipDetails);
        toast.success("Deleted!!");
      })
      .catch(() => {
        toast.error("Server Error!");
      });
  }
  return (
    <>
      <Modal
        open={childOpen}
        setOpen={setChildOpen}
        component={
          <InternshipItem
            internships={internships}
            setInternships={setInternships}
            handleSubmit={handleSubmit}
            disableForm={false}
          />
        }
      />
      <div>
        <h4><p>{item.role}</p></h4>
        <div style={{fontWeight:"600",color:"#696969",fontSize:"14px"}}>{item.companyName}</div>
        <div style={{display:"flex", flexDirection:"row", fontWeight:"600",color:"#696969",fontSize:"14px"}}>
        <p>{item.startMonth}</p>
        <div style={{paddingLeft:"0.5rem", fontWeight:"600",color:"#696969",fontSize:"14px"}}><p>{item.startYear}</p></div>
        </div>
        <div style={{display:"flex", flexDirection:"row", fontWeight:"600",color:"#696969",fontSize:"14px"}}>
        <p>{item.endMonth}</p>
        <div style={{paddingLeft:"0.5rem", fontWeight:"600",color:"#696969",fontSize:"14px"}}><p>{item.endYear}</p></div>
        </div>
        <p style={{fontWeight:"600",color:"#696969",fontSize:"14px"}}>{item.description}</p>
        <p>{item.ongoing}</p>
        {showModal && <button onClick={handleClick}>Edit</button>}
        {showModal && <button onClick={handleDelete}>Delete</button>}
      </div>
    </>
  );
};

export default ResumeInternshipItem;
