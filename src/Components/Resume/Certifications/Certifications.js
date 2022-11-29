import React, { useState } from "react";
import ResumeCertificationItem from "./CertificationItem";
import Modal from "../../ModalComponent";

const CertificationsComponent = ({ data,setData,showModal,setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <h3>Certifications</h3>
      {data.map((item) => (
        <ResumeCertificationItem key={item._id} item={item} setData={setData} showModal={showModal} />
      ))}
      {!showModal && <button onClick={handleOpen}>Edit</button>}
    </div>
  );
};

const Certifications=({data,setData})=>{
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        open={open} setOpen={setOpen}
        component={<CertificationsComponent data={data} setData={setData} showModal={true} setOpen={setOpen} />}/>
      <CertificationsComponent data={data} showModal={false} setOpen={setOpen} />
    </>
  )
}

export default Certifications;
