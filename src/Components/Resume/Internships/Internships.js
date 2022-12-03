import React, { useState } from "react";
import Modal from "../../ModalComponent";
import ResumeInternshipItem from "./InternshipItem";
import AddInternship from "../../ProfileForm/Internship Experience/internships"
import FeatherIcon from "feather-icons-react";

const InternshipsComponent = ({ data,setData, showModal, setOpen,setAddOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };

  const handleAddOpen=()=>{
    setAddOpen(true)
  }

  return (
    <div>
      
      <h4 style={{color:"orange", paddingTop:"1.5rem", paddingBottom:"0.7rem"}}>Internship</h4>
      <div style={{display:"flex", flexDirection:"row", paddingLeft:"58rem"}}>
      {!showModal && <div style={{display:"flex",width:"5rem",justifyContent:"space-between",alignItems:"center"}}><FeatherIcon icon='plus' onClick={handleAddOpen} style={{cursor:"pointer"}} /> <FeatherIcon icon='edit-2' onClick={handleOpen} style={{cursor:"pointer"}} /> </div>}
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
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false)
  const handleAdd=(data)=>{
    setData(data)
    setAddOpen(false)
  }
  return (
    <>
      <Modal
        open={editOpen} setOpen={setEditOpen}
        component={<InternshipsComponent data={data} setData={setData} showModal={true} setOpen={setEditOpen} />}/>
        <Modal open={addOpen} setOpen={setAddOpen}
        component={<AddInternship handleAdd={handleAdd} />} />
      <InternshipsComponent data={data} showModal={false} setOpen={setEditOpen} setAddOpen={setAddOpen} />
    </>
  );
};

export default Internships;
