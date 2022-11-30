import React, { useState } from "react";
import Modal from "../../ModalComponent";
import ResumeAchievementItem from "./AchievementItem";
import FeatherIcon from "feather-icons-react";

const AchievementsComponent = ({ data,setData,showModal,setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <h4 style={{color:"orange", paddingTop:"1.5rem", paddingBottom:"0.7rem"}}>Achievements</h4>
      <div style={{display:"flex", flexDirection:"row", paddingLeft:"58rem"}}>
        {!showModal && <button onClick={handleOpen}><FeatherIcon icon="edit" size={15} color="#064709" /></button>}
      </div>
     
      {data.map((item) => ( 
      <div className="grid-container" style={{width:"700px", paddingBottom:"1rem"}}>
        <div className="grid-item">
      <ul>
      <li>
        <ResumeAchievementItem key={item._id} item={item} setData={setData} showModal={showModal} /> </li></ul>
        </div>
        </div>
      ))}
     
      
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
