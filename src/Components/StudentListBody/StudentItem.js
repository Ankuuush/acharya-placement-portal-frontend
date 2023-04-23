import { Button } from "@mui/material";
import Check from "../Check";
import { useNavigate } from "react-router-dom";

const StudentItem = ({ student }) => {
  const navigate=useNavigate();
  const name=student.student.firstName+" "+ student.student.lastName
  const handleProfile=()=>{
    navigate("/tpo/student-details",{state:{data:student}})
  }
    return (
      <div className="student-list-item">
        <div className="student-list-item-main">
          <h5 style={{marginRight:"0.5rem"}}>{name}</h5>
          <Check />
        </div>
        <Button onClick={handleProfile} size="large"
        variant="contained" style={{backgroundColor:"#1E4786"}}>View Profile</Button>
      </div>
    );
  };

  export default StudentItem;