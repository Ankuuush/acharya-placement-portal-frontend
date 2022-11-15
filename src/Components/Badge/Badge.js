import React from "react";
import "./Badge.css";
import FeatherIcon from "feather-icons-react";

export default function Badge({ icon, text, color, backgroundColor }) {
    return (
        <div className="badge-root" style={{backgroundColor}}>
            <FeatherIcon icon={icon} color={color || "#213780"} size={17} className="badge-icon" />
            <p className="badge-text" style={{color}}>{text}</p>
        </div>
    );
}