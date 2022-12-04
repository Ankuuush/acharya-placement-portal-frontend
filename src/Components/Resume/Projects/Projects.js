import React, { useState } from "react";
import Modal from "../../ModalComponent";
import ResumeProjectItem from "./ProjectItem";
import FeatherIcon from "feather-icons-react";
import AddProjects from "../../ProfileForm/Projects/Projects";

const ProjectsComponent = ({ data,setData,showModal,setOpen,setAddOpen }) => {
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
            icon="inbox"
            color="#f69131"
            style={{ marginRight: 10 }}
          />
          <h4 className="section_title_resume">Projects</h4>
        </div>
        {!showModal && <div style={{display:"flex",width:"5rem",justifyContent:"space-between",alignItems:"center"}}><FeatherIcon icon='plus' onClick={handleAddOpen} style={{cursor:"pointer"}} /> <FeatherIcon icon='edit-2' onClick={handleOpen} style={{cursor:"pointer"}} /> </div>}
      </div>
      <div style={{display:"flex", flexDirection:"row", paddingLeft:"58rem"}}>
      </div>
      <ul>
      
      {data.map((item) => (
       <li style={{marginTop: 20}}> <ResumeProjectItem key={item._id} item={item} setData={setData} showModal={showModal} /> </li>
      ))}
      </ul>
      <div style={{paddingTop:"0.5rem"}}>
        <hr className="job-hr"/>
      </div>
    </div>
  );
};

const Projects=({data,setData})=>{
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
        component={<ProjectsComponent data={data} setData={setData} showModal={true} setOpen={setEditOpen} />}/>
        <Modal open={addOpen} setOpen={setAddOpen}
        component={<AddProjects handleAdd={handleAdd} />} />
      <ProjectsComponent data={data} showModal={false} setOpen={setEditOpen} setAddOpen={setAddOpen} />
    </>
  )
}

export default Projects;
