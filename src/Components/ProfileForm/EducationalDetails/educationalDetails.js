import {
  Button,
} from "@mui/material";
import React, { useState } from "react";
import EducationalDetailsItem from "./educationalDetailsItem";

const EducationalDetails = () => {
  const [first, setFirst] = useState(true)
  const [second, setSecond] = useState(true)
  const [third, setThird] = useState(true)

  const [loading, setLoading] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "30em",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "3em",
      }}
    >
      <h2>Educational Details</h2>

        <EducationalDetailsItem text={"10th"} check={setFirst} />
        <EducationalDetailsItem text={"12th"} check={setSecond} />
        <EducationalDetailsItem text={"graduation"} check={setThird}/>
        
        <Button
          disabled={loading || first || second || third}
          size="large"
          variant="contained"
          color="warning"
          type="submit"
          style={{
            width: "48%",
              marginTop: "1rem",
              marginBottom: "0.5rem",
              fontSize:"0.9rem",
            padding:"0.5rem"
          }}
        >
          Next
        </Button>
    </div>
  );
};

export default EducationalDetails;
