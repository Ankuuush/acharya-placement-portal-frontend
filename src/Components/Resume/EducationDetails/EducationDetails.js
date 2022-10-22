import React, { useState } from "react";
import UpdateResumeModal from "../../UpdateResumeModal";
import ResumeEducationDetailsItem from "./EducationDetailsItem";

const EducationDetailsComponent = ({ data,setData, showModal, setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <h3>Education Details</h3>
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
      <UpdateResumeModal
        open={open} setOpen={setOpen}
        component={<EducationDetailsComponent data={data} setData={setData} showModal={true} setOpen={setOpen} />}/>
      <EducationDetailsComponent data={data} showModal={false} setOpen={setOpen} />
    </>
  );
};

export default EducationDetails;
