import React, { useState } from "react";
import UpdateResumeModal from "../../UpdateResumeModal";
import ResumeAchievementItem from "./AchievementItem";

const AchievementsComponent = ({ data,setData,showModal,setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <h3>Achievements</h3>
      {data.map((item) => (
        <ResumeAchievementItem key={item._id} item={item} setData={setData} showModal={showModal} />
      ))}
      {!showModal && <button onClick={handleOpen}>Edit</button>}
    </div>
  );
};

const Achievements=({data,setData})=>{
  const [open, setOpen] = useState(false);
  return (
    <>
      <UpdateResumeModal
        open={open} setOpen={setOpen}
        component={<AchievementsComponent data={data} setData={setData} showModal={true} setOpen={setOpen} />}/>
      <AchievementsComponent data={data} showModal={false} setOpen={setOpen} />
    </>
  )
}


export default Achievements;
