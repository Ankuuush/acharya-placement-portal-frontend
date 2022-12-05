import React, { useState } from "react";
import ResumeCertificationItem from "./CertificationItem";
import Modal from "../../ModalComponent";
import FeatherIcon from "feather-icons-react";
import AddCertifications from "../../ProfileForm/Certifications/Certifications";

const CertificationsComponent = ({ data,setData,showModal,setOpen,setAddOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  const handleAddOpen=()=>{
    setAddOpen(true)
  }
  return (
    <div>
      <div className="flex-tie">
      <div className="flex-tie margin-top-bottom" style={{marginBottom: 10}}>
          <FeatherIcon
            icon="award"
            color="#f69131"
            style={{ marginRight: 10 }}
          />
          <h4 className="section_title_resume">Certifications</h4>
        </div>
        {!showModal && <div style={{display:"flex",width:"5rem",justifyContent:"space-between",alignItems:"center"}}><FeatherIcon icon='plus' onClick={handleAddOpen} style={{cursor:"pointer"}} /> <FeatherIcon icon='edit-2' onClick={handleOpen} style={{cursor:"pointer"}} /> </div>}
      </div>
      <ul>
      {data.map((item) => (
        <li  style={{marginTop: 20}}><ResumeCertificationItem key={item._id} item={item} setData={setData} showModal={showModal} /></li>
      ))}</ul>
      <div style={{paddingTop:"0.5rem"}}>
        <hr className="job-hr"/>
      </div>
    </div>
  );
};

const Certifications=({data,setData})=>{
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
        component={<CertificationsComponent data={data} setData={setData} showModal={true} setOpen={setEditOpen} />}/>
        <Modal open={addOpen} setOpen={setAddOpen}
        component={<AddCertifications handleAdd={handleAdd} />} />
      <CertificationsComponent data={data} showModal={false} setOpen={setEditOpen} setAddOpen={setAddOpen} />
    </>
  )
}

export default Certifications;
