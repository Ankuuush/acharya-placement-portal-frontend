import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { PaddingOutlined } from "@mui/icons-material";

const SkillItem = ({ skill,disableBut,onDelete,skillStyle }) => {
  return (
    <div
      style={{
        width: "fit-content",
        height: "1.6rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        border: "2px solid rgba(0, 0, 0, 0.21)",
        borderRadius: "0.4rem",
        boxShadow: "none",
        marginBottom:"1rem",
        marginRight:"1rem"
        
      }}
    >
      <p
        style={{
          ...skillStyle,
          height: "100%",
          paddingLeft:"5%",
          paddingRight:"5%",
          boxSizing: "border-box",
          margin: "0",
          textAlign: "center",
          lineHeight: "1.6rem",
          fontWeight: "bold",
          fontSize: "0.8em",
          whiteSpace:"nowrap",
          overflow:"hidden",
          textOverflow:"ellipsis",
          
        }}
      >
        {skill.name}
      </p>
      {!disableBut &&<button
      onClick={()=>onDelete(skill._id)}
        style={{
          width: "fit-content",
          height: "100%",
          padding: "0",
          border: "none",
          borderRadius: "0.4rem",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          cursor:"pointer"
        }}
      >
        <ClearIcon style={{ height: "50%" }} />
      </button>}
    </div>
  );
};

export default SkillItem;
