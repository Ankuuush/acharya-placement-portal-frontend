import React, { useState } from "react";
import Modal from "../../ModalComponent";
import ResumeInternshipItem from "./InternshipItem";

const InternshipsComponent = ({ data,setData, showModal, setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <h3>Internship</h3>
      {data.map((item) => (
        <ResumeInternshipItem key={item._id} item={item} setData={setData} showModal={showModal} />
      ))}
      {!showModal && <button onClick={handleOpen}>Edit</button>}
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
