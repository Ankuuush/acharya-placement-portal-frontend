import { Button } from "@mui/material";
import Check from "../Check";
import { useNavigate } from "react-router-dom";

const StudentItem = ({ student }) => {
  const navigate=useNavigate();
  console.log(student)
  const name=student.student.firstName+" "+ student.student.lastName
  const handleProfile=()=>{
    navigate("/tpo/student-details",{state:{data:student}})
  }
    return (
      <div className="student-list-item">
        <div className="student-list-item-main" style={{marginLeft: 15}}>
          <img src={student.profile.basicDetails.photoUrl || "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"} className="student-list-item-image" style={{borderRadius: 1000, marginRight: 15, height: 50, width: 50}} />
          <h5 style={{marginRight:"0.5rem"}}>{name}</h5>
          {/* <Check /> */}
          {student.appliedBy && <Check />}
        </div>
        <Button onClick={handleProfile} size="large"
        variant="contained" style={{backgroundColor:"#1E4786", marginRight: 15}}>View Profile</Button>
      </div>
    );
  };

  export default StudentItem;