import { Button } from "@mui/material";
import Check from "../Check";
import { useNavigate } from "react-router-dom";

const StudentItem = ({ item }) => {
  const navigate=useNavigate();
  const handleProfile=()=>{
    navigate("/tpo/student-details")
  }
    return (
      <div className="student-list-item">
        <div className="student-list-item-main">
          <h5 style={{marginRight:"0.5rem"}}>{item}</h5>
          <Check />
        </div>
        <Button onClick={handleProfile} size="large"
        variant="contained" style={{backgroundColor:"#1E4786"}}>View Profile</Button>
      </div>
    );
  };

  export default StudentItem;