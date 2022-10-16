import React from "react";
import SkillItem from "../../Items/SkillItem";

const SkillCategoryItem = ({ data }) => {
  return (
    <>
      {data.map((skill) => (
        <SkillItem key={skill._id}
        skill={skill}
        disableBut={true}
        onDelete={()=>{}}
        skillStyle={{width:"100%"}} />
      ))}
      <button>Edit</button>
    </>
  );
};

export default SkillCategoryItem;
