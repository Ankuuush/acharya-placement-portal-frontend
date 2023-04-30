import React, { useEffect, useState } from "react";
import api from "../api";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ModalComponent from "../Components/ModalComponent";
import { toast } from "react-toastify";

const Verifications = () => {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eoiVerifications, setEoiVerifications] = useState([]);
  const [marksVerifications, setMarksVerifications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getAllVerifications();
    const interval = setInterval(() => {
      getAllVerifications();
    }, 10000);

    return () => {
      return clearInterval(interval);
    };
  }, []);

  const getAllVerifications = () => {
    setVerifications([]);
    api.get("/tpo/verifications").then((response) => {
      setVerifications(response.data.data.verifications.reverse());
      setEoiVerifications(
        response.data.data.verifications.filter(
          (verification) =>
            verification.profile.preconditions.eoiUnderVerification
        )
      );
      setLoading(false);
    });
  };

  const eoiProcess = (type, id) => {
    alert("Are you sure you want to "+type+" this verification?");
    api.post("/tpo/verifications/eoi/"+type+"/"+id).then(() => {
       setModalOpen(false);
       getAllVerifications();
       toast.success("Verification Processed Successfully");
    });
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: 15 }}>
      <ModalComponent
        open={modalOpen}
        setOpen={setModalOpen}
        component={modalComponent}
      />
      <p className="search-header">Verifications</p>
      <p>
        Here you will find all the verifications requested by students. You can
        accept or reject them.
      </p>
      <Box
        sx={{
          width: "100%",
          background: "white",
          borderRadius: 1,
          marginTop: 4,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="verificaiton tabs"
          >
            <Tab
              label="Expression Of Interest Verification"
              style={{ textTransform: "none" }}
            />
            <Tab label="Marks Verification" style={{ textTransform: "none" }} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {eoiVerifications && eoiVerifications.length > 0 ? <div>{eoiVerifications.map((verification) => {
              return (
                <div
                  className="student-list-item-main"
                  style={{
                    marginLeft: 5,
                    marginTop: 10,
                    marginRight: 30,
                    minWidth: "30%",
                    marginBottom: 30,
                  }}
                >
                  <img
                    src={
                      verification.profile.basicDetails.photoUrl ||
                      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
                    }
                    className="student-list-item-image"
                    style={{
                      borderRadius: 1000,
                      marginRight: 15,
                      height: 55,
                      width: 55,
                    }}
                  />
                  <div>
                    <h5 style={{ marginRight: "0.5rem" }}>
                      {verification.student.firstName +
                        " " +
                        verification.student.lastName}
                      <br />
                      <button
                        style={{
                          border: "none",
                          padding: "4px 7px",
                          borderRadius: 4,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setModalComponent(
                            <div>
                              <h3 style={{ marginBottom: 15 }}>
                                Expression Of Interest
                              </h3>
                              <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 15,}}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={
                                    verification.profile.basicDetails
                                      .photoUrl ||
                                    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
                                  }
                                  className="student-list-item-image"
                                  style={{
                                    borderRadius: 1000,
                                    marginRight: 10,
                                    height: 35,
                                    width: 35,
                                  }}
                                />
                                <h5 style={{ marginRight: "0.5rem" }}>
                                  {verification.student.firstName +
                                    " " +
                                    verification.student.lastName}
                                </h5>
                              </div>
                              <div>
                                <button style={{border: "none", padding: "7px 10px", color: "white",background: "green", marginRight: 15, borderRadius: 3, fontSize: 16, opacity: 0.9}} onClick={()=> eoiProcess("accept", verification.profile._id)}>Approve</button>
                                <button style={{border: "none", padding: "7px 10px", color: "white",background: "red", marginRight: 15, borderRadius: 3, fontSize: 16, opacity: 0.9}} onClick={()=> eoiProcess("reject", verification.profile._id)}>Reject</button>
                              </div>
                              </div>
                              <object
                                data={
                                  verification.profile.preconditions.eoi
                                    .location
                                }
                                randomKey={
                                  verification.profile.preconditions.eoi
                                    .createdOn
                                }
                                type="application/pdf"
                                style={{ minHeight: "100vh", width: "100%" }}
                                key={
                                  verification.profile.preconditions.eoi
                                    .createdOn
                                }
                              ></object>
                            </div>
                          );
                          setModalOpen(true);
                        }}
                      >
                        View Uploaded Document
                      </button>
                    </h5>
                  </div>
                  <hr />
                  {/* <Check /> */}
                </div>
              );
            })}</div>: <p>No EOI verifications available at this time</p>}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </div>
  );
};

export default Verifications;
