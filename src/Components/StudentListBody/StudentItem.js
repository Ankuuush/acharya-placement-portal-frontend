import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import Chip from "@mui/material/Chip";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext/AuthContext";

const StudentItem = ({ student, from, selectedStudents, toggleSelectStudent }) => {
  const navigate=useNavigate();
  const name=student.student.firstName+" "+ student.student.lastName
  const context=useContext(AuthContext)
  const {token}=context
  const handleProfile=()=>{
    console.log(token.account)
    navigate(`/${token.account}/student-details`,{state:{data:student}})
  }
    return (
      <div className="student-list-item">
        <div className="student-list-item-main" style={{marginLeft: 5}}>
         {from === "eligible" && <Checkbox checked={selectedStudents.indexOf(student.student._id) !== -1} onClick={()=> toggleSelectStudent(student.student._id)} style={{marginRight: 5}} />}
          <img src={student.profile.basicDetails.photoUrl || "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"} className="student-list-item-image" style={{borderRadius: 1000, marginRight: 15, height: 50, width: 50}} />
          <h5 style={{marginRight:"0.5rem"}}>{name}</h5>
          {/* <Check /> */}
          {/* {from === "applied" ? student.appliedBy === "self" ? <Chip label="Self-Applied" style={{backgroundColor:"#1E4786", color:"white"}} /> : <Chip label="TPO Added" style={{backgroundColor:"#1E4786", color:"white", fontSize: 10}} /> : null} */}
        </div>
        <Button onClick={handleProfile} size="large"
        variant="contained" style={{backgroundColor:"#1E4786", marginRight: 15}}>View Profile</Button>
      </div>
    );
  };

  export default StudentItem;