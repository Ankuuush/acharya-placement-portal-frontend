import React, { useState } from "react";
import Modal from "../../ModalComponent";
import ResumeEducationDetailsItem from "./EducationDetailsItem";

const EducationDetailsComponent = ({ data,setData, showModal, setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>

      <h4 style={{color:"orange", paddingTop:"1.5rem", paddingBottom:"0.7rem"}}>Education Details</h4>
      <div style={{display:"flex", flexDirection:"row"}}>
      <h4>X :</h4>
      <div style={{display:"flex", flexDirection:"column", paddingLeft:"1.1rem"}}>
      <ResumeEducationDetailsItem data={data.tenth} setData={setData} showModal={showModal}/></div>  
      <div style={{paddingLeft:"53rem"}}>

      {!showModal && <button onClick={handleOpen}>Edit</button>}
      </div>  
      </div>
      <div style={{display:"flex", flexDirection:"row", paddingTop:"0.5rem"}}>
      <h4>XII :</h4>
      <div style={{display:"flex", flexDirection:"column", paddingLeft:"0.5rem"}}>
      <ResumeEducationDetailsItem text={"12th"} data={data.twelfth} setData={setData} showModal={showModal}/> </div></div>
      <div style={{display:"flex", flexDirection:"row", paddingTop:"0.5rem"}}>
      <h4>BE :</h4>
      <div style={{display:"flex", flexDirection:"column", paddingLeft:"0.5rem"}}>
      <ResumeEducationDetailsItem text={"graduation"} data={data.ug} setData={setData} showModal={showModal}/></div></div>
     
      <div style={{paddingTop:"0.5rem"}}>
        <hr className="job-hr"/>
      </div>
    
    </div>
    
  );
};

const EducationDetails = ({ data,setData }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        open={open} setOpen={setOpen}
        component={<EducationDetailsComponent data={data} setData={setData} showModal={true} setOpen={setOpen} />}/>
      <EducationDetailsComponent data={data} showModal={false} setOpen={setOpen} />
    </>
  );
};

export default EducationDetails;
