import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { PaddingOutlined } from "@mui/icons-material";

const SkillItem = ({ skill,disableBut,onDelete,skillStyle }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        borderRadius: "0.4rem",
        marginRight:"1rem",
        background: "#f2f2f2",
        width: "fit-content",
        padding: "5px 10px",
        marginTop: "10px"
      }}
    >
      <p
        style={{
          margin: "0",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {skill.name}
      </p>
      {!disableBut &&<button
      onClick={()=>onDelete(skill._id)}
        style={{
          height: "100%",
          padding: "0",
          border: "none",
          borderRadius: "0.4rem",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          cursor:"pointer",
          marginLeft: 10
        }}
      >
        <ClearIcon style={{ height: "50%" }} />
      </button>}
    </div>
  );
};

export default SkillItem;
