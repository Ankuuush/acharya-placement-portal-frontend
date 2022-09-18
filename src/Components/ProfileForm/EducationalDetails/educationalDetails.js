import {
  Button,
} from "@mui/material";
import React, { useState } from "react";
import NextButton from "../../Items/NextButton";
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
        
        <NextButton disable={loading|| first||second|| third} style={{width: "48%"}}/>
    </div>
  );
};

export default EducationalDetails;
