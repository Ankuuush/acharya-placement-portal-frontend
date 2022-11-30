import React, { useState } from "react";
import Modal from "../../ModalComponent";
import ResumeProjectItem from "./ProjectItem";
import FeatherIcon from "feather-icons-react";

const ProjectsComponent = ({ data,setData,showModal,setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <h4 style={{color:"orange", paddingTop:"1.5rem", paddingBottom:"0.7rem"}}>Projects</h4>
      <div style={{display:"flex", flexDirection:"row", paddingLeft:"55rem"}}>
        {!showModal && <button onClick={handleOpen}><FeatherIcon icon="edit" size={15} color="#064709" /></button>}
      </div>
      
       
      {data.map((item) => (
        <div className="grid-container" style={{width:"700px", paddingBottom:"1rem"}}>
        <div className="grid-item">
       <ul>
       <li> 
        <ResumeProjectItem key={item._id} item={item} setData={setData} showModal={showModal} /> 
       </li> 
       </ul>
       </div>
       </div>
      ))}
      
     
      <div style={{paddingTop:"1.5rem"}}>
        <hr className="resume-hr"/>
      </div>
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
