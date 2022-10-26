import React from "react";
import "./Topbar.css";
import FeatherIcon from "feather-icons-react";
import { Badge } from "@mui/material";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { useContext } from "react";

function getGreetings() {
    var greet = [
        '🌃  Time to get some rest',
        '🌇  Good Morning',
        '🌞  Good Afternoon',
        '🌅  Good Evening'
      ][ parseInt(new Date().getHours() / 24 * 4) ];
    return greet;
}

export default function Topbar() {
    const authContext = useContext(AuthContext)
  const {currentUser}=authContext
  return (
    <div className="topbar-root">
      <p className="greeting-topbar">{getGreetings()+ " " + currentUser.displayName.split(" ")[0]}</p>
      <div className="icon-group clickable">
      <FeatherIcon icon={"calendar"} color="white" />
      <Badge badgeContent={4} color="warning">
        <div className="notif-icon">
          <FeatherIcon icon={"bell"} color="#213780" />
        </div>
      </Badge>
      </div>    
    </div>
  );
}
