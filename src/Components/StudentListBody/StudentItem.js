import { Button } from "@mui/material";
import Check from "../Check";

const StudentItem = ({ item }) => {
    return (
      <div className="student-list-item">
        <div className="student-list-item-main">
          <h5 style={{marginRight:"0.5rem"}}>{item}</h5>
          <Check />
        </div>
        <Button size="large"
        variant="contained" style={{backgroundColor:"#1E4786"}}>View Profile</Button>
      </div>
    );
  };

  export default StudentItem;