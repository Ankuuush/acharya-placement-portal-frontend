import { Button } from "@mui/material";
import React from "react";

const NextButton = (props) => {
  const { setActiveStep, disable, styleProp } = props;
  const onClick = () => {
    setActiveStep(prev=> prev + 1);
  };
  return (
    <Button
      onClick={onClick}
      disabled={disable}
      size="large"
      variant="contained"
      color="warning"
      type="submit"
      style={{
        ...styleProp,
        position: "relative",
        marginTop: "1rem",
        marginBottom: "0.5rem",
        fontSize: "0.9rem",
        padding: "0.5rem",
      }}
    >
      Next
    </Button>
  );
};

export default NextButton;
