import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api";
import Modal from "../../ModalComponent";
import ProjectsItem from "../../ProfileForm/Projects/ProjectsItem";

const ResumeProjectItem = ({ item, setData, showModal }) => {
  const [childOpen, setChildOpen] = useState(false);
  const [projects, setProjects] = useState(item);
  const handleClick = () => {
    setChildOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    api
      .patch(`/student/profile/projects/${item._id}`, {
        title: projects.title,
        description: projects.description,
        link: projects.link,
      })
      .then((response) => {
        setData(response.data.data.doc.projects);
        toast.success("Data saved!");
        setChildOpen(false);
      })
      .catch(() => {
        toast.error("Server Error!");
      });
  };
  const handleDelete=()=>{
    api
      .delete(`/student/profile/projects/${item._id}`)
      .then((response) => {
        setData(response.data.data.doc.projects);
        toast.success("Deleted!!");
      })
      .catch(() => {
        toast.error("Server Error!");
      });
  }
  return (
    <>
      <Modal
        open={childOpen}
        setOpen={setChildOpen}
        component={
          <ProjectsItem
            projects={projects}
            setProjects={setProjects}
            handleSubmit={handleSubmit}
            disableForm={false}
          />
        }
      />
      <div>
        <h4>{item.title}</h4>
        {item.link && <a href={item.link} style={{
        textDecoration: "none",
        color: "#20367f"
      }} target="_blank">{item.link}<br /></a>}
        <p>{item.description}</p>
      </div>
      <div style={{marginTop: 10, marginBottom: 10}}>
      {showModal && <button onClick={handleClick} className="section_edit_btn" style={{marginRight: 10}}>Edit</button>}
      {showModal && <button onClick={handleDelete} className="section_delete_btn">Delete</button>}
      </div>
    </>
  );
};

export default ResumeProjectItem;
