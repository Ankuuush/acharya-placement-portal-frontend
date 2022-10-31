import React from "react";
import "./Badge.css";
import FeatherIcon from "feather-icons-react";

export default function Badge({ icon, text}) {
    return (
        <div className="badge-root">
            <FeatherIcon icon={icon} color="#213780" size={17} className="badge-icon" />
            <p className="badge-text">{text}</p>
        </div>
    );
}