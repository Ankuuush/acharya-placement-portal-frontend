import React, { useEffect, useState } from "react";
import api from "../../../api";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
const EducationalDetailsItem = (props) => {
  const { educationalInfo, setEducationalInfo, handleSubmit, text } = props;
  const [disableBut, setDisableBut] = useState(false);
  const [maxScale, setMaxScale] = useState(0);
  const onChange = (e) => {
    setEducationalInfo({ ...educationalInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitBut = async (e) => {
    e.preventDefault();
    setDisableBut(true);
    if (await handleSubmit(text, educationalInfo)){
      setDisableBut(false);
    } 
  };

  useEffect(() => {
    setMaxScale(educationalInfo.gradeScale);
  }, [educationalInfo.gradeScale]);
  return (
    <form
      onSubmit={handleSubmitBut}
      style={{
        position: "relative",
        marginBottom: "2rem",
      }}
    >
      <h3 style={{marginBottom: 30, marginTop: 20}}>Enter your {text} details below</h3>
      <TextField
        name="institution"
        onChange={onChange}
        value={educationalInfo.institution}
        size="normal"
        label="Institute"
        type="text"
        variant="outlined"
        style={{ width: "100%", margin: "0.35rem 0" }}
        required
      />
      <div style={{ position: "relative", width: "100%" }}>
        <TextField
          name="startYear"
          onChange={onChange}
          value={educationalInfo.startYear}
          size="normal"
          type="number"
          label="Start Year"
          inputProps={{ min: 1900, max: 2022 }}
          variant="outlined"
          style={{ width: "48%", margin: "1rem 0" }}
          required
        />
        <TextField
          name="endYear"
          onChange={onChange}
          value={educationalInfo.endYear}
          size="normal"
          type="number"
          label="End Year"
          inputProps={{ min: 1900, max: 2028 }}
          variant="outlined"
          style={{
            width: "48%",
            position: "absolute",
            right: "0",
            margin: "1rem 0",
          }}
          required
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ width: "48%", margin: "1rem 0" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Scale</InputLabel>
            <Select
              name="gradeScale"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={educationalInfo.gradeScale}
              label="Scale"
              onChange={onChange}
              required
            >
              <MenuItem value={"10"}>CGPA</MenuItem>
              <MenuItem value={"100"}>Percentage</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          name="grade"
          onChange={onChange}
          value={educationalInfo.grade}
          size="normal"
          type="number"
          label="Grade"
          variant="outlined"
          style={{
            width: "48%",
            margin: "1rem 0",
          }}
          disabled={educationalInfo.scale === "" ? true : false}
          inputProps={{ min: 0, max: maxScale }}
          required
        />
      </div>
      <Button
        disabled={disableBut}
        size="large"
        variant="contained"
        color="warning"
        type="submit"
        style={{
          width: "48%",
          marginTop: "1rem",
          fontSize: "0.8rem",
          padding: "0.5rem",
        }}
      >
        Save
      </Button>
    </form>
  );
};

export default EducationalDetailsItem;
