import React, { useState } from "react";
import ResumeCertificationItem from "./CertificationItem";
import Modal from "../../ModalComponent";

const CertificationsComponent = ({ data,setData,showModal,setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <h4 style={{color:"orange", paddingTop:"1.5rem", paddingBottom:"0.7rem"}}>Certifications</h4>
      <div style={{display:"flex", flexDirection:"row", paddingLeft:"58rem"}}>
        {!showModal && <button onClick={handleOpen}>Edit</button>}
      </div>
      <ul>
      <li>
      {data.map((item) => (
        <ResumeCertificationItem key={item._id} item={item} setData={setData} showModal={showModal} />
      ))}
      </li></ul>
      <div style={{paddingTop:"0.5rem"}}>
        <hr className="job-hr"/>
      </div>
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
