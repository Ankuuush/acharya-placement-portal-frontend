import React, { useState } from "react";
import Modal from "../../ModalComponent";
import ResumeEducationDetailsItem from "./EducationDetailsItem";

const EducationDetailsComponent = ({ data,setData, showModal, setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <h3 style={{marginBottom: 30}}>Education Detailss</h3>
      <ResumeEducationDetailsItem text={"10th"} data={data.tenth} setData={setData} showModal={showModal}/>
      <ResumeEducationDetailsItem text={"12th"} data={data.twelfth} setData={setData} showModal={showModal}/>
      <ResumeEducationDetailsItem text={"graduation"} data={data.ug} setData={setData} showModal={showModal}/>
      {!showModal && <button onClick={handleOpen}>Edit</button>}
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
