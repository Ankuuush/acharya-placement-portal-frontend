import React, { useState } from "react";
import ResumeCertificationItem from "./CertificationItem";
import Modal from "../../ModalComponent";
import FeatherIcon from "feather-icons-react";

const CertificationsComponent = ({ data,setData,showModal,setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <h4 style={{color:"orange", paddingTop:"1.5rem", paddingBottom:"0.7rem"}}>Certifications</h4>
      <div style={{display:"flex", flexDirection:"row", paddingLeft:"58rem"}}>
        {!showModal && <button onClick={handleOpen}><FeatherIcon icon="edit" size={15} color="#064709" /></button>}
      </div>
     
      {data.map((item) => ( 
      <div style={{width:"700px", paddingBottom:"1rem"}}>
      <ul>
      <li>
        <ResumeCertificationItem key={item._id} item={item} setData={setData} showModal={showModal} /></li></ul>
        </div>
      ))}
      
      <div style={{paddingTop:"0.5rem"}}>
        <hr className="resume-hr"/>
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
