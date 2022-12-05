import React from "react";
import { useState } from "react";
import NextButton from "../../Items/NextButton";
import InternshipItem from "./internshipItem";
import api from "../../../api";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const Internships = ({ activeStep, setActiveStep,handleAdd=false }) => {
  const [internshipsArray, setInternshipsArray] = useState([]);
  const [newForm, setNewForm] = useState(true);
  const [internships, setInternships] = useState({
    companyName: "",
    startMonth: "",
    startYear: 0,
    endMonth: "",
    endYear: 0,
    ongoing: "",
    role: "",
    description: "",
  });

  const handleSubmit =(e) => {
    e.preventDefault();

    let newinternshipsArray = internshipsArray;
    newinternshipsArray.push(internships);
    setInternshipsArray(newinternshipsArray);

    api
      .post(`/student/profile/internships`, {
        companyName: internships.companyName,
        startMonth: internships.startMonth,
        startYear: parseInt(internships.startYear),
        endMonth: internships.endMonth,
        endYear: parseInt(internships.endYear),
        ongoing: internships.ongoing,
        description: internships.description,
        role: internships.role,
      })
      .then((response) => {
        toast.success("Data saved!");
        setInternships({
          companyName: "",
          startMonth: "",
          startYear: 0,
          endMonth: "jan",
          endYear: 2000,
          ongoing: "",
          role: "",
          description: "",
        });
        setNewForm(false);
        if(handleAdd)
        {
          handleAdd(response.data.data.profile.internshipDetails)
        }
      })
      .catch(() => {
        toast.error("Server Error!");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 style={{marginBottom: 20}}>Internship Experience</h2>
      <div style={{ position: "relative" }}>
        {internshipsArray.map((iArr, key) => {
          return (
            <InternshipItem
              key={key}
              disableForm={true}
              internships={iArr}
              setInternships={setInternships}
              handleSubmit={handleSubmit}
            />
          );
        })}
        {newForm && (
          <InternshipItem
            disableForm={false}
            internships={internships}
            setInternships={setInternships}
            handleSubmit={handleSubmit}
          />
        )}
        {!handleAdd && <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            disabled={newForm}
            size="large"
            variant="contained"
            color="warning"
            onClick={() => setNewForm(true)}
            style={{
              width: "48%",
              marginTop: "1rem",
              marginBottom: "0.5rem",
              fontSize: "0.9rem",
              padding: "0.5rem",
            }}
          >
            Add Another Role
          </Button>
          <NextButton
            setActiveStep={setActiveStep}
            activeStep={activeStep}
            disable={newForm}
            styleProp={{ width: "48%" }}
          />
        </div>}
      </div>
    </div>
  );
};

export default Internships;
