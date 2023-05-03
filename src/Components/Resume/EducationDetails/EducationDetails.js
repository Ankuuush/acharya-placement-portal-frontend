import React, { useState } from "react";
import Modal from "../../ModalComponent";
import ResumeEducationDetailsItem from "./EducationDetailsItem";
import FeatherIcon from "feather-icons-react";
import "../index.css";

const EducationDetailsComponent = ({ data, setData, showModal, setOpen, refreshProfile, educationAllowed }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <div className="flex-tie">
        <div className="flex-tie margin-top-bottom">
          <FeatherIcon
            icon="book"
            color="#f69131"
            style={{ marginRight: 10 }}
          />
          <h4 className="section_title_resume">Education Details {!educationAllowed && " (Locked)"}</h4>
        </div>
        {!showModal && educationAllowed  && (
          <FeatherIcon
            icon="edit-2"
            onClick={handleOpen}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
      <div
      >
        <div>
          <h4>10th (Schooling)</h4>
          <div style={{ display: "flex", flexDirection: "column"}}>
            <ResumeEducationDetailsItem
            text={"10th"}
              data={data.tenth}
              setData={setData}
              showModal={showModal}
            />
          </div>
        </div>
      </div>
      <div
        style={{ marginTop: 30 }}
      >
        <h4>12th (Pre-University)</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ResumeEducationDetailsItem
          text={"12th"}
            data={data.twelfth}
            setData={setData}
            showModal={showModal}
          />
        </div>
      </div>
      <div
        style={{ marginTop: 30 }}
      >
        <h4>Graduation</h4>
        <div
        >
          <ResumeEducationDetailsItem
          text={"graduation"}
            data={data.ug}
            setData={setData}
            showModal={showModal}
          />
        </div>
      </div>

      <div style={{ paddingTop: "0.5rem" }}>
        <hr className="job-hr" />
      </div>
    </div>
  );
};

const EducationDetails = ({ data, setData, educationAllowed }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        component={
          <EducationDetailsComponent
            data={data}
            setData={setData}
            showModal={true}
            setOpen={setOpen}
          />
        }
      />
      <EducationDetailsComponent
        data={data}
        showModal={false}
        setOpen={setOpen}
        educationAllowed={educationAllowed}
      />
    </>
  );
};

export default EducationDetails;
