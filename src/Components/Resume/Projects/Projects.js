import React, { useState } from "react";
import Modal from "../../ModalComponent";
import ResumeProjectItem from "./ProjectItem";

const ProjectsComponent = ({ data,setData,showModal,setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <h3>Projects</h3>
      {data.map((item) => (
        <ResumeProjectItem key={item._id} item={item} setData={setData} showModal={showModal} />
      ))}
      {!showModal && <button onClick={handleOpen}>Edit</button>}
    </div>
  );
};

const Projects=({data,setData})=>{
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        open={open} setOpen={setOpen}
        component={<ProjectsComponent data={data} setData={setData} showModal={true} setOpen={setOpen} />}/>
      <ProjectsComponent data={data} showModal={false} setOpen={setOpen} />
    </>
  )
}

export default Projects;
