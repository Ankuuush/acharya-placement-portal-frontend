import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import axios from "axios";
import ModalComponent from "../ModalComponent";

const Company = ({fetchCompanies, setOpen}) => {
  const [company, setCompany] = useState([]);
  const [selected, setSelected] = useState(null);

  const getCompany = async (company) => {
    if (company.length > 2) {
      try {
        const response = await axios.post(
          "https://glass-getter.herokuapp.com/scrape-company",
          {
            company: company,
          }
        );
        setCompany(response.data);
      } catch (error) {
        toast.error("Server Error!");
      }
    }
  };

  const handleSubmitCompany = () => {
    api
      .post("tpo/company", {
        name: selected.label,
        logoUrl: selected.logoURL ? selected.logoURL : "https://suesys.com/assets/website/images/company-logo-default.png",
        external_id: selected.id,
      })
      .then((res) => {
        fetchCompanies();
        setOpen(false);
        toast.success("Company added!!");
      })
      .catch((error) => {
        toast.error(error.response.data.error.message);
      });
  };

  return (
    <div>
      <h2>Add a new company onto the platform</h2>
      <p style={{ marginTop: 10, marginBottom: 40 }}>
        Search for the company you want to add to the placement portal. Once
        added this company will be whitelisted across all departments.
      </p>
      <Autocomplete
        id="country-select-demo"
        sx={{ width: "100%" }}
        options={company}
        onInputChange={(event, newValue) => {
          getCompany(newValue);
        }}
        onChange={(value, select) => {
          setSelected(select);
        }}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="30"
              src={
                option.logoURL
                  ? option.logoURL
                  : "https://suesys.com/assets/website/images/company-logo-default.png"
              }
              alt=""
            />
            {option.label}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Start typing to search companies..."
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
      {selected ? (
        <div style={{ marginTop: 30 }}>
          <h4>Selected Company:</h4>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: 10,
              marginTop: 20,
              backgroundColor: "#F3F4F8",
              borderRadius: 7,
            }}
          >
            <img
              src={
                selected.logoURL
                  ? selected.logoURL
                  : "https://suesys.com/assets/website/images/company-logo-default.png"
              }
              alt=""
              style={{ width: 50, marginRight: 15 }}
            />
            <h3>{selected.label}</h3>
          </div>
        </div>
      ) : null}
      <div style={{ marginTop: 30 }}>
        <h4>Company Search Declaration:</h4>
        <ul style={{ marginTop: 20 }}>
          <li>Company search has been integrated with Glassdoor</li>
          <li>The Logo and other details may not be changed on being added</li>
          <li>
            An audit trail will be created tied to your user showing the
            creation
          </li>
        </ul>
      </div>
      <Button
        size="large"
        variant="contained"
        color="warning"
        type="submit"
        disabled={!selected}
        onClick={handleSubmitCompany}
        style={{
          width: "60%",
          marginLeft: "20%",
          position: "relative",
          marginTop: "4rem",
          marginBottom: "0.5rem",
          fontSize: "1rem",
          padding: "0.5rem",
          textTransform: "none",
        }}
      >
        Add Company
      </Button>
    </div>
  );
};

const CompanyDetails = ({
  setActiveStep,
  postJob,
  setPostJob,
  company,
  setCompany,
}) => {
  const onChangeCompany = (e) => {
    const val = e.target.value;
    setPostJob({ ...postJob, [e.target.name]: val._id });
    setCompany(val);
  };
  const onChange = (e) => {
    setPostJob({ ...postJob, [e.target.name]: e.target.value });
  };
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveStep((prev) => prev + 1);
  };
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = () => {
    api
      .get("/tpo/company")
      .then((response) => {
        setCompanies(response.data.data.companies);
      })
      .catch((error) => {
        toast.error("Server Error!");
      });
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div>
      <ModalComponent open={open} setOpen={setOpen} component={<Company fetchCompanies={fetchCompanies} setOpen={setOpen} />} />
      <h3>Company Details</h3>
      <p style={{margin:  "10px 0px"}}>Select the company for which the drive will be posted, if the company is not on this list, click on <b>Add Company</b> to whitelist it</p>
      <form onSubmit={handleSubmit}>
        <Box sx={{ margin: "0.35rem 0", marginTop: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Company</InputLabel>
            <Select
              name="company"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={company.name}
              label="Company"
              onChange={onChangeCompany}
              required
            >
              {companies.map((item) => {
                return (
                  <MenuItem key={item._id} value={item}>
                    <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            style={{alignItems: "center", display: "flex"}}
          >
            <img
              loading="lazy"
              width="30"
              src={
                item.logoUrl
                  ? item.logoUrl
                  : "https://suesys.com/assets/website/images/company-logo-default.png"
              }
              alt=""
              style={{borderRadius: 3, height: 30, width: 30}}
            />
            {item.name}
          </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <TextField
          name="location"
          onChange={onChange}
          value={postJob.location}
          size="normal"
          label="Job Locaton (Type N/A if not applicable)"
          type="text"
          variant="outlined"
          style={{ width: "100%", margin: "0.35rem 0" }}
          required
        />
        <p
          onClick={() => {
            setOpen(true);
          }}
          style={{
            display: "block",
            width: "100%",
            textAlign: "end",
            textDecoration: "none",
            color: "#4AA9ED",
            cursor: "pointer",
            fontWeight: "bolder",
            margin: "10px 0px"
          }}
        >
          + Add Company
        </p>
        <Button
          size="large"
          variant="contained"
          color="warning"
          type="submit"
          style={{
            width: "60%",
            marginLeft: "20%",
            position: "relative",
            marginTop: "1rem",
            marginBottom: "0.5rem",
            fontSize: "0.9rem",
            padding: "0.5rem",
          }}
        >
          Save & Next
        </Button>
      </form>
    </div>
  );
};

export default CompanyDetails;