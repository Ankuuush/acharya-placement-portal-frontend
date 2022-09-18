import { Button } from "@mui/material";
import React from "react";

const NextButton = (props) => {
  return (
    <Button
      disabled={props.disable}
      size="large"
      variant="contained"
      color="warning"
      type="submit"
      style={{
        ...props.styleProp,
        position:"relative",
        marginTop: "1rem",
        marginBottom: "0.5rem",
        fontSize: "0.9rem",
        padding: "0.5rem"
      }}
    >
      Next
    </Button>
  );
};

export default NextButton;
