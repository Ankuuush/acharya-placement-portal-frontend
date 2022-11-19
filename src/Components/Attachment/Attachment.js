import React from "react";
import "./Attachment.css";
import Badge from "../Badge/Badge";

function getFileType(type) {
  switch (type) {
    //image
    case "image/png":
    case "image/jpeg":
    case "image/jpg":
    case "image/gif":
      return "Image File";
    case "application/pdf":
      return "PDF File";
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "Word File";
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return "Excel File";
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return "PowerPoint File";
    case "application/zip":
      return "Zip File";
    case "application/x-rar-compressed":
      return "RAR File";
    case "application/x-7z-compressed":
      return "7z File";
    case "application/x-tar":
      return "Tar File";
    default:
      return "File";
  }
}

export default function Attachment({ fkey, location, size, type }) {
  return (
    <div className="attachment-root">
      <p className="atta-key-text">{fkey.split("/").slice(-1)[0]}</p>
      <div>
      <p className="atta-info">{getFileType(type)}</p>
      <p className="atta-info">{Number(size)/1000} Kb</p>
      </div>
      <div className="open-btn-atta" onClick={()=> window.open(location, "_blank")}>Open</div>
    </div>
  );
}
