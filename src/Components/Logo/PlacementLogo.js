import React, { Component } from 'react';
import logo from "../../Assets/Acharya_logo.png";

const PlacementLogo = () => {
    return (
        <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: 25
            }}
          >
            <img
              src={logo}
              alt="logo"
              className="collegeIcon"
              style={{ height: "5.5rem", width: "auto" }}
            />
            <h2
              style={{
                textAlign: "center",
                margin: 0,
                color: "#213780",
                fontSize: 28,
                marginLeft: 18,
              }}
            >
              Placement Cell
            </h2>
          </div>
    );
}

export default PlacementLogo;