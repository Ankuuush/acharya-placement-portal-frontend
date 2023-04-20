import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import ModalComponent from "../ModalComponent";

const Company = () => {
  const name = useRef("");
  const description = useRef("");
  const website = useRef("");
  const [logoUrl, setLogoUrl] = useState("")

  const handleChange = async (e) => {
    const formData = new FormData();
    formData.append("scope", "company_logo");
    formData.append("file", e.target.files[0]);
    api
      .post("/tpo/upload", formData)
      .then((res) => {
        setLogoUrl( res.data.data.location );
        toast.success("Company Logo Uploaded!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
          hideProgressBar: true,
        });
      })
      .catch((err) => {
        console.log(err)
        toast.error("Server Error!");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name.current.value)
    api.post('tpo/company',{
      name:name.current.value,
      description:description.current.value,
      website:website.current.value,
      logoUrl:logoUrl
    }).then((res)=>
    {
      console.log(res.data)
      toast.success('Company added!!')
    }).catch((error)=>{
      console.log(error)
      toast.error('Server error!!')
    })
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        size="normal"
        label="Company Name"
        type="text"
        variant="outlined"
        inputRef={name}
        style={{ width: "100%", margin: "0.35rem 0" }}
        required
      />
      <TextField
        name="description"
        size="normal"
        label="About the company"
        type="text"
        multiline
        inputRef={description}
        minRows={5}
        variant="outlined"
        style={{ width: "100%", margin: "0.35rem 0" }}
        required
      />
      <TextField
        name="website"
        size="normal"
        label="Website"
        type="url"
        variant="outlined"
        inputRef={website}
        style={{ width: "100%", margin: "0.35rem 0" }}
        required
      />
      <input
        name="company-logo"
        type="file"
        accept="image/*"
        onChange={handleChange}
        required
      />
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
        Save Company
      </Button>
    </form>
  );
};

const CompanyDetails = ({ setActiveStep, postJob, setPostJob,company, setCompany }) => {

  const onChangeCompany=(e)=>{
    const val=e.target.value
    setPostJob({ ...postJob, [e.target.name]: val._id });
    setCompany(val)
  }
  const onChange = (e) => {
    setPostJob({ ...postJob, [e.target.name]: e.target.value });
  };
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveStep((prev) => prev + 1);
  };
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    api
      .get("/tpo/company")
      .then((response) => {
        setCompanies(response.data.data.companies);
      })
      .catch((error) => {
        toast.error("Server Error!");
      });
  }, []);


  return (
    <div>
      <ModalComponent open={open} setOpen={setOpen} component={<Company />} />
      <h3>Company Details</h3>
      <form onSubmit={handleSubmit}>
        <Box sx={{ margin: "0.35rem 0" }}>
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
                    {item.name}
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
          label="Location"
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
          }}
        >
          Add Company
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
