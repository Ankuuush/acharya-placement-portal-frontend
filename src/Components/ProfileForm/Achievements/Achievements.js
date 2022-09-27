import React from "react";
import { useState } from "react";
import NextButton from "../../Items/NextButton";
import api from "../../../api";
import { Button } from "@mui/material";
import AchievementItem from "./AchievementItem";

const Achievements = ({activeStep,setActiveStep}) => {
    const [loading, setLoading] = useState(false);
  const [achievementsArray, setAchievementsArray] = useState([]);
  const [newForm, setNewForm] = useState(true);
  const [achievements, setAchievements] = useState({
    organization: "",
    title: "",
    link: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let newachievementsArray = achievementsArray;
    newachievementsArray.push(achievements);
    setAchievementsArray(newachievementsArray);
    try {
      const response = await api
        .post(`/student/profile/achievements`, {
            organization: achievements.organization,
            title: achievements.title,
            link: achievements.link,
            description: achievements.description
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
    setAchievements({
        organization: "",
        title: "",
        link: "",
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
      <h2>Achievements</h2>
      <div style={{ position: "relative", width: "80%" }}>
        {achievementsArray.map((aArr, key) => {
          return (
            <AchievementItem
              key={key}
              loading={loading}
              disableForm={true}
              achievements={aArr}
              setAchievements={setAchievements}
              handleSubmit={handleSubmit}
            />
          );
        })}
        {newForm && (
          <AchievementItem
            loading={loading}
            disableForm={false}
            achievements={achievements}
            setAchievements={setAchievements}
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
  )
}

export default Achievements