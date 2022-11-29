import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api";
import AchievementsItem from "../../ProfileForm/Achievements/AchievementItem";
import Modal from "../../ModalComponent";

const ResumeAchievementItem = ({ item, setData, showModal }) => {
  const [childOpen, setChildOpen] = useState(false);
  const [achievements, setAchievements] = useState(item);
  const handleClick = () => {
    setChildOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    api
      .patch(`/student/profile/achievements/${item._id}`, {
        organization: achievements.organization,
        title: achievements.title,
        link: achievements.link,
        description: achievements.description,
      })
      .then((response) => {
        setData(response.data.data.doc.achievements);
        toast.success("Data saved!");
        setChildOpen(false);
      })
      .catch(() => {
        toast.error("Server Error!");
      });
  };
  const handleDelete=()=>{
    api
      .delete(`/student/profile/achievements/${item._id}`)
      .then((response) => {
        setData(response.data.data.doc.achievements);
        toast.success("Deleted!!");
      })
      .catch(() => {
        toast.error("Server Error!");
      });
  }
  return (
    <div>
      <Modal
        open={childOpen}
        setOpen={setChildOpen}
        component={
          <AchievementsItem
            achievements={achievements}
            setAchievements={setAchievements}
            handleSubmit={handleSubmit}
            disableForm={false}
          />
        }
      />
      <p>{item.title}</p>
      <p>{item.link}</p>
      <p>{item.description}</p>
      <p>{item.organization}</p>
      {showModal && <button onClick={handleClick}>Edit</button>}
      {showModal && <button onClick={handleDelete}>Delete</button>}
    </div>
  );
};

export default ResumeAchievementItem;
