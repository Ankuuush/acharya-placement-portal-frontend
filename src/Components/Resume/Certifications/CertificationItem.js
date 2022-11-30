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
      <p style={{fontWeight:"600",color:"#696969",fontSize:"14px"}}>{item.organization}</p>
      <p style={{fontWeight:"600",color:"#696969",fontSize:"14px"}}>{item.description}</p>
      <p style={{fontWeight:"600",color:"#696969",fontSize:"14px"}}>{item.certificateLink}</p>
      {showModal && <button onClick={handleClick}>Edit</button>}
      {showModal && <button onClick={handleDelete}>Delete</button>}
    </div>
  );
};

export default ResumeCertificationItem;
