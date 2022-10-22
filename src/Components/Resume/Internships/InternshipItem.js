import React, { useState } from "react";
import UpdateResumeModal from "../../UpdateResumeModal";
import InternshipItem from "../../ProfileForm/Internship Experience/internshipItem";
import { toast } from "react-toastify";
import api from "../../../api";

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
      <UpdateResumeModal
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
        {item.companyName}
        <p>{item.role}</p>
        <p>{item.startMonth}</p>
        <p>{item.startYear}</p>
        <p>{item.endMonth}</p>
        <p>{item.endYear}</p>
        <p>{item.description}</p>
        <p>{item.ongoing}</p>
        {showModal && <button onClick={handleClick}>Edit</button>}
        {showModal && <button onClick={handleDelete}>Delete</button>}
      </div>
    </>
  );
};

export default ResumeInternshipItem;
