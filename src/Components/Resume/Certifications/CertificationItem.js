import React, { useState } from "react";
import CertificationsItem from "../../ProfileForm/Certifications/CertificationsItem";
import { toast } from "react-toastify";
import api from "../../../api";
import Modal from "../../ModalComponent";

const ResumeCertificationItem = ({ item, setData, showModal }) => {
  const [childOpen, setChildOpen] = useState(false);
  const [certifications, setCertifications] = useState(item);
  const handleClick = () => {
    setChildOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    api
      .patch(`/student/profile/certifications/${item._id}`, {
        organization: certifications.organization,
          name: certifications.name,
          certificateLink: certifications.certificateLink,
          description: certifications.description,
      })
      .then((response) => {
        setData(response.data.data.doc.certifications);
        toast.success("Data saved!");
        setChildOpen(false);
      })
      .catch(() => {
        toast.error("Server Error!");
      });
  };

  const handleDelete=()=>{
    api
      .delete(`/student/profile/certifications/${item._id}`)
      .then((response) => {
        setData(response.data.data.doc.certifications);
        toast.success("Deleted!!");
      })
      .catch(() => {
        toast.error("Server Error!");
      });
  }
  return (
    <div>
      <Modal
        open={childOpen}
        setOpen={setChildOpen}
        component={
          <CertificationsItem
            certifications={certifications}
            setCertifications={setCertifications}
            handleSubmit={handleSubmit}
            disableForm={false}
          />
        }
      />
      
      <h4>{item.name}</h4>
      <div style={{color: "#737373", marginTop: 10}}>Organisation: <span style={{color: "black"}}>{item.organization}</span></div>
      <p style={{"maxWidth":"80%"}}>{item.description}</p>
      {item.certificateLink && <>
        <a href={item.certificateLink} style={{
        textDecoration: "none",
        color: "#20367f"
      }} target="_blank">{item.certificateLink}</a>
      <br /></>}
      <div style={{marginTop: 15}}>
      {showModal && <button onClick={handleClick} className="section_edit_btn" style={{marginRight: 10}}>Edit</button>}
        {showModal && <button onClick={handleDelete} className="section_delete_btn">Delete</button>}
        </div>
    </div>
  );
};

export default ResumeCertificationItem;
