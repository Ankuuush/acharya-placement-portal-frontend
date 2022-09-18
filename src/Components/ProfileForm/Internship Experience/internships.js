import React from "react";
import { useState } from "react";
import NextButton from "../../Items/NextButton";
import InternshipItem from "./internshipItem";
import api from "../../../api";
import { Button } from "@mui/material";

const Internships = () => {
  const [loading, setLoading] = useState(false);
  const [internshipsArray, setInternshipsArray] = useState([]);
  const [newForm, setNewForm] = useState(true);
  const [internships, setInternships] = useState({
    companyName: "",
    startMonth: "",
    startYear: 0,
    endMonth: "jan",
    endYear: 0,
    ongoing: "",
    role: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newinternshipsArray = internshipsArray;
    newinternshipsArray.push(internships);
    setInternshipsArray(newinternshipsArray);
    try {
      const response = await api
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
        .then((response) => response);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
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
    setLoading(false);
  };
  
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
      <h2>Internship Experience</h2>
      <div style={{ position: "relative", width: "80%" }}>
        {internshipsArray.map((iArr, key) => {
          return (
            <InternshipItem
              key={key}
              loading={loading}
              disableForm={true}
              internships={iArr}
              setInternships={setInternships}
              handleSubmit={handleSubmit}
            />
          );
        })}
        {newForm && (
          <InternshipItem
            loading={loading}
            disableForm={false}
            internships={internships}
            setInternships={setInternships}
            handleSubmit={handleSubmit}
          />
        )}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            disabled={loading || newForm}
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
            disable={loading || newForm}
            disableForm={false}
            styleProp={{ width: "48%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Internships;
