import React from "react";
import { useState } from "react";
import NextButton from "../../Items/NextButton";
import api from "../../../api";
import { Button } from "@mui/material";
import AchievementItem from "./AchievementItem";
import { toast } from "react-toastify";

const Achievements = ({activeStep,setActiveStep,handleAdd=false}) => {
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
    let newachievementsArray = achievementsArray;
    newachievementsArray.push(achievements);
    setAchievementsArray(newachievementsArray);
    api
      .post(`/student/profile/achievements`, {
        organization: achievements.organization,
        title: achievements.title,
        link: achievements.link,
        description: achievements.description
      })
      .then((response) => {
        toast.success("Data saved!");
        setAchievements({
          organization: "",
          title: "",
          link: "",
          description: "",
      });
        setNewForm(false);
        if(handleAdd)
        {
          handleAdd(response.data.data.profile.achievements)
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
              disableForm={true}
              achievements={aArr}
              setAchievements={setAchievements}
              handleSubmit={handleSubmit}
            />
          );
        })}
        {newForm && (
          <AchievementItem
            disableForm={false}
            achievements={achievements}
            setAchievements={setAchievements}
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
            Add Another
          </Button>
          <NextButton setActiveStep={setActiveStep} activeStep={activeStep}
            disable={false}
            styleProp={{ width: "48%" }}
          />
        </div>}
      </div>
    </div>
  )
}

export default Achievements