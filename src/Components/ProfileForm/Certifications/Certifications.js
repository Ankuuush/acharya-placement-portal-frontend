import React from "react";
import { useState } from "react";
import NextButton from "../../Items/NextButton";
import api from "../../../api";
import { Button } from "@mui/material";
import CertificationsItem from "./CertificationsItem";
import { toast } from "react-toastify";

const Certifications = ({activeStep,setActiveStep}) => {
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

    let newcertificationsArray = certificationsArray;
    newcertificationsArray.push(certifications);
    setCertificationsArray(newcertificationsArray);

    api
      .post(`/student/profile/certifications`, {
        organization: certifications.organization,
          name: certifications.name,
          certificateLink: certifications.certificateLink,
          description: certifications.description,
      })
      .then(() => {
        toast.success("Data saved!");
        setCertifications({
          organization: "",
          name: "",
          certificateLink: "",
          description: "",
        });
        setNewForm(false);
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
              disableForm={true}
              certifications={cArr}
              setCertifications={setCertifications}
              handleSubmit={handleSubmit}
            />
          );
        })}
        {newForm && (
          <CertificationsItem
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
