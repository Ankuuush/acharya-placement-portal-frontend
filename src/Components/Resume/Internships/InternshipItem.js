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
        <h4>{item.role}</h4>
        <div style={{color: "#737373", marginTop: 10}}>Organisation: <span style={{color: "black"}}>{item.companyName}</span></div>
        <div style={{color: "#737373", marginTop: 3}}>Start: <span style={{color: "black"}}>{item.startMonth.split("")[0].toUpperCase() + item.startMonth.slice(1)} {item.startYear}</span></div>
        {!item.ongoing && <div style={{color: "#737373", marginTop: 3}}>End: <span style={{color: "black"}}>{item.endMonth.split("")[0].toUpperCase() + item.endMonth.slice(1)} {item.endYear}</span></div>}
        <p style={{"maxWidth":"80%"}}>{item.description}</p>
        <div style={{marginTop: 15}}>
        {showModal && <button onClick={handleClick} className="section_edit_btn" style={{marginRight: 10}}>Edit</button>}
        {showModal && <button onClick={handleDelete} className="section_delete_btn">Delete</button>}
        </div>

      </div>
    </>
  );
};

export default ResumeInternshipItem;
