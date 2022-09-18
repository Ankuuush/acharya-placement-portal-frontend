import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
const InternshipItem = (props) => {
  const { internships, setInternships, handleSubmit, disableForm,loading } = props;
  const [checked, setChecked] = useState(false);
  const handleOngoing = () => {
    setChecked(!checked);
  };
  const onChange = (e) => {
    if(!disableForm)
    setInternships({ ...internships, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if(!disableForm)
    setInternships({ ...internships, ongoing: checked });
  }, [checked]);
  return (
    <form
      disabled={disableForm}
      onSubmit={handleSubmit}
      style={{
        position: "relative",
        margin: "0",
      }}
    >
      <h3>Enter the details</h3>
      <TextField
        name="role"
        onChange={onChange}
        value={internships.role}
        disabled={disableForm}
        size="normal"
        label="Designation"
        type="text"
        variant="outlined"
        style={{ width: "100%", margin: "0.35rem 0" }}
        required
      />
      <TextField
        name="companyName"
        onChange={onChange}
        value={internships.companyName}
        disabled={disableForm}
        size="normal"
        label="Company Name"
        type="text"
        variant="outlined"
        style={{ width: "100%", margin: "0.35rem 0" }}
        required
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ width: "48%", margin: "0.35rem 0" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Start Month</InputLabel>
            <Select
              name="startMonth"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={internships.startMonth}
              disabled={disableForm}
              label="Start Month"
              onChange={onChange}
              required
            >
              <MenuItem value="jan">January</MenuItem>
              <MenuItem value="feb">February</MenuItem>
              <MenuItem value="mar">March</MenuItem>
              <MenuItem value="apr">April</MenuItem>
              <MenuItem value="may">May</MenuItem>
              <MenuItem value="jun">June</MenuItem>
              <MenuItem value="jul">July</MenuItem>
              <MenuItem value="aug">August</MenuItem>
              <MenuItem value="sep">September</MenuItem>
              <MenuItem value="oct">October</MenuItem>
              <MenuItem value="nov">November</MenuItem>
              <MenuItem value="dec">December</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          name="startYear"
          onChange={onChange}
          value={internships.startYear}
          disabled={disableForm}
          size="normal"
          type="number"
          label="Start Year"
          inputProps={{ min: 2000, max: 2022 }}
          variant="outlined"
          style={{
            width: "48%",
            margin: "0.35rem 0",
            position: "absolute",
            right: "0",
          }}
          required
        />
      </div>
      <FormControlLabel
        control={
          <Checkbox
            disabled={disableForm}
            checked={checked}
            onChange={handleOngoing}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Ongoing?"
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ width: "48%", margin: "0.35rem 0" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">End Month</InputLabel>
            <Select
              name="endMonth"
              disabled={checked || disableForm}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={internships.endMonth}
              label="End Month"
              onChange={onChange}
              required
            >
              <MenuItem value={"jan"}>January</MenuItem>
              <MenuItem value={"feb"}>February</MenuItem>
              <MenuItem value={"mar"}>March</MenuItem>
              <MenuItem value={"apr"}>April</MenuItem>
              <MenuItem value={"may"}>May</MenuItem>
              <MenuItem value={"jun"}>June</MenuItem>
              <MenuItem value={"jul"}>July</MenuItem>
              <MenuItem value={"aug"}>August</MenuItem>
              <MenuItem value={"sep"}>September</MenuItem>
              <MenuItem value={"oct"}>October</MenuItem>
              <MenuItem value={"nov"}>November</MenuItem>
              <MenuItem value={"dec"}>December</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          name="endYear"
          onChange={onChange}
          disabled={checked || disableForm}
          value={internships.endYear?internships.endYear:internships.startYear?internships.startYear:2000}
          size="normal"
          type="number"
          label="End Year"
          inputProps={{ min: internships.startYear?internships.startYear:2000, max: 2022 }}
          variant="outlined"
          style={{
            width: "48%",
            margin: "0.35rem 0",
            position: "absolute",
            right: "0",
          }}
          required
        />
      </div>
      <TextField
        name="description"
        onChange={onChange}
        value={internships.description}
        disabled={disableForm}
        size="normal"
        label="Description"
        multiline
        rows={3}
        type="text"
        variant="outlined"
        style={{ width: "100%", margin: "0.35rem 0" }}
        required
      />

      {!disableForm && (
        <Button
          disabled={loading}
          size="large"
          variant="contained"
          type="submit"
          style={{
            width: "100%",
            marginTop: "1rem",
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
            padding: "0.5rem",
          }}
        >
          Save
        </Button>
      )}
    </form>
  );
};

export default InternshipItem;
