import React from "react";
import { useState } from "react";
import NextButton from "../../Items/NextButton";
import api from "../../../api";
import { Button } from "@mui/material";
import CertificationsItem from "./CertificationsItem";

const Certifications = ({activeStep,setActiveStep}) => {
  const [loading, setLoading] = useState(false);
  const [certificationsArray, setCertificationsArray] = useState([]);
  const [newForm, setNewForm] = useState(true);
  const [certifications, setCertifications] = useState({
    organization: "",
    name: "",
    certificateLink: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newcertificationsArray = certificationsArray;
    newcertificationsArray.push(certifications);
    setCertificationsArray(newcertificationsArray);
    try {
      const response = await api
        .post(`/student/profile/certifications`, {
          organization: certifications.organization,
          name: certifications.name,
          certificateLink: certifications.certificateLink,
          description: certifications.description,
        })
        .then((response) => response);
        console.log(response)
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
    setCertifications({
      organization: "",
      name: "",
      certificateLink: "",
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
        alignItems: "center"
      }}
    >
      <h2>Certifications</h2>
      <div style={{ position: "relative", width: "80%" }}>
        {certificationsArray.map((cArr, key) => {
          return (
            <CertificationsItem
              key={key}
              loading={loading}
              disableForm={true}
              certifications={cArr}
              setCertifications={setCertifications}
              handleSubmit={handleSubmit}
            />
          );
        })}
        {newForm && (
          <CertificationsItem
            loading={loading}
            disableForm={false}
            certifications={certifications}
            setCertifications={setCertifications}
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
            Add Another
          </Button>
          <NextButton setActiveStep={setActiveStep} activeStep={activeStep}
            disable={newForm}
            styleProp={{ width: "48%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Certifications;
