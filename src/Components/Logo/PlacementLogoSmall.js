import React, { Component } from 'react';
import logo from "../../Assets/Acharya_logo.png";

const PlacementLogoSmall = () => {
    return (
        <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: 5
            }}
          >
            <img
              src={logo}
              alt="logo"
              className="collegeIcon"
              style={{ height: "3rem", width: "auto" }}
            />
            <h2
              style={{
                textAlign: "center",
                margin: 0,
                color: "#213780",
                fontSize: 22,
                marginLeft: 14,
              }}
            >
              Placement Cell
            </h2>
          </div>
    );
}

export default PlacementLogoSmall;