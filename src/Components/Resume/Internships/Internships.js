import React, { useState } from "react";
import Modal from "../../ModalComponent";
import ResumeInternshipItem from "./InternshipItem";

const InternshipsComponent = ({ data,setData, showModal, setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      
      <h4 style={{color:"orange", paddingTop:"1.5rem", paddingBottom:"0.7rem"}}>Internship</h4>
      <div style={{display:"flex", flexDirection:"row", paddingLeft:"58rem"}}>
      {!showModal && <button onClick={handleOpen}>Edit</button>}
      </div>
     <ul>
      <li>
      {data.map((item) => (
        <ResumeInternshipItem key={item._id} item={item} setData={setData} showModal={showModal} />
      ))}
      </li></ul>
      <div style={{paddingTop:"0.5rem"}}>
        <hr className="job-hr"/>
      </div>
    </div>
    
  );
};

const Internships = ({ data,setData }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        open={open} setOpen={setOpen}
        component={<InternshipsComponent data={data} setData={setData} showModal={true} setOpen={setOpen} />}/>
      <InternshipsComponent data={data} showModal={false} setOpen={setOpen} />
    </>
  );
};

export default Internships;
