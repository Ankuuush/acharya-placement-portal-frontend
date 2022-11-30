import React, { useState } from "react";
import Modal from "../../ModalComponent";
import ResumeAchievementItem from "./AchievementItem";

const AchievementsComponent = ({ data,setData,showModal,setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <h4 style={{color:"orange", paddingTop:"1.5rem", paddingBottom:"0.7rem"}}>Achievements</h4>
      <div style={{display:"flex", flexDirection:"row", paddingLeft:"58rem"}}>
        {!showModal && <button onClick={handleOpen}>Edit</button>}
      </div>
      <ul>
      <li>
      {data.map((item) => (
        <ResumeAchievementItem key={item._id} item={item} setData={setData} showModal={showModal} />
      ))}
      </li></ul>
      
    </div>
  );
};

const Achievements=({data,setData})=>{
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        open={open} setOpen={setOpen}
        component={<AchievementsComponent data={data} setData={setData} showModal={true} setOpen={setOpen} />}/>
      <AchievementsComponent data={data} showModal={false} setOpen={setOpen} />
    </>
  )
}


export default Achievements;
