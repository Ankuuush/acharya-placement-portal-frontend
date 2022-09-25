import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

const SkillItem = ({ skill }) => {
  return (
    <div
      style={{
        width: "5rem",
        height: "1.6rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        border: "2px solid rgba(0, 0, 0, 0.21)",
        borderRadius: "0.4rem",
        boxShadow: "none",
        marginBottom:"1rem"
      }}
    >
      <p
        style={{
          width: "70%",
          height: "100%",
          boxSizing: "border-box",
          margin: "0",
          textAlign: "center",
          lineHeight: "1.6rem",
          fontWeight: "bold",
          fontSize: "0.8em",
        }}
      >
        {skill.name}
      </p>
      <button
        style={{
          width: "30%",
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
      </button>
    </div>
  );
};

export default SkillItem;
