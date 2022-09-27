import React, { useState } from "react";
import NextButton from "../../Items/NextButton";
import EducationalDetailsItem from "./educationalDetailsItem";

const EducationalDetails = ({activeStep,setActiveStep}) => {
  const [count, setCount] = useState(0)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "30em",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Educational Details</h2>

        <EducationalDetailsItem text={"10th"} count={count} setCount={setCount}/>
        <EducationalDetailsItem text={"12th"} count={count} setCount={setCount} />
        <EducationalDetailsItem text={"graduation"} count={count} setCount={setCount}/>
        <NextButton setActiveStep={setActiveStep} activeStep={activeStep} disable={count!==3} styleProp={{width: "48%"}}/> 
    </div>
  );
};

export default EducationalDetails;
