import React, { useState, useEffect } from "react";
import SignupForm from "../SignUp/SignupForm";
import { ReactExcel, readFile, generateObjects } from "@ramonak/react-excel";
import api from "../../api";
import Spinner from "../../Components/Spinner/Spinner";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import "./index.css"

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

const Registration = () => {
  const [initialData, setInitialData] = useState(undefined);
  const [currentSheet, setCurrentSheet] = useState({});
  const [task, setTask] = useState(null);

  const [value, setValue] = React.useState(0);

  const [manually, setManually] = useState({
    name: "",
    email: "",
    usn: "",
  });

  const handleUpload = (event) => {
    const file = event.target.files[0];
    //read excel file
    readFile(file)
      .then((readedData) => setInitialData(readedData))
      .catch((error) => console.error(error));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function poll(id) {
    let taskT = await getTaskStatus(id);
    const interval = setInterval(() => {
      taskT = getTaskStatus(id);
    }, 500);

    if (
      task.data.totalStudents ===
      task.data.createdStudents + task.data.failedStudents
    ) {
      clearInterval(interval);
    }

    toast.success("Students addition job started successfully");
    setManually({
      name: "",
      email: "",
      usn: "",
    });
  }

  const getTaskStatus = (id) => {
    api.get("tpo/tasks/" + id).then((res) => {
      setTask(res.data.data.task);
      return res.data.data.task;
    });
  };

  const save = () => {
    const result = generateObjects(currentSheet);
    //save array of objects to backend
    api
      .post("tpo/students/add", { students: result, batch: 19 })
      .then((res) => {
        setTask(res.data.data.task);
        poll(res.data.data.task._id);
      });
    console.log(result);
  };

  const saveSingle = () => {
    api
      .post("tpo/students/add", { students: [{
        name:manually.name,
        email:manually.email,
        usn:manually.usn
      }], batch: 19 })
      .then((res) => {
        setTask(res.data.data.task);
        poll(res.data.data.task._id);
      });
  };
  return (
    <div>
      <div style={{ padding: 15 }}>
        <h4>Add students to department</h4>
        <p>
          Upload an excel file of a list of students from your department and
          click on add students, this will then create and add students onto the
          platform
        </p>
      </div>
      <div style={{ background: "white", borderRadius: 5, margin: 10 }}>
        {/* <div style={{ width: "50%",
    boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
    padding: 20,
    background: "white",
    borderRadius: 15,
    margin:"2rem auto" }}>
      <h3>Register Student</h3>
      <SignupForm toastText={"Student Registeration Successful!!"}/>
    </div> */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="verificaiton tabs"
          >
            <Tab label="Add manually" style={{ textTransform: "none" }} />
            <Tab
              label="Add by uploading sheet"
              style={{ textTransform: "none" }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div style={{ background: "white", padding: 15, borderRadius: 10, justifyItems: "center", alignItems: "center" }}>
            <p style={{marginBottom: 30}}>
              Enter the required details and click on add student, this will
              then create and add student onto your department
            </p>
            <TextField label="Name" variant="outlined" value={manually.name}  onChange={(e)=>setManually({...manually,name:e.target.value})} style={{width: "50%"}}/>
            <br />
            <br />
            <TextField label="Email" variant="outlined" value={manually.email}  onChange={(e)=>setManually({...manually,email:e.target.value})} style={{width: "50%"}}/>
            <br />
            <br />
            <TextField label="USN" variant="outlined" value={manually.usn} onChange={(e)=>setManually({...manually,usn:e.target.value})} style={{width: "50%"}}/>
            <br/>
            <br/>
            <button
              onClick={saveSingle}
              style={{
                border: "none",
                padding: 15,
                background: "#E87C25",
                color: "white",
                borderRadius: 5,
                fontWeight: "bolder",
                marginTop: 15,
                fontSize: 17
              }}
            >
              Add Student
            </button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div style={{ background: "white", padding: 15, borderRadius: 10 }}>
            <p>
              Upload an excel file of a list of students from your department
              and click on add students, this will then create and add students
              onto the platform
            </p>
            <input
              type="file"
              accept=".xlsx"
              onChange={handleUpload}
              style={{
                border: "none",
                padding: 15,
                background: "#E87C25",
                color: "white",
                borderRadius: 5,
                fontWeight: "bolder",
                marginTop: 15,
              }}
            />
            <br />
            <br />
            <ReactExcel
              initialData={initialData}
              onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
              activeSheetClassName="active-sheet"
              style={{
                border: "none",
                padding: 15,
                background: "#E87C25",
                color: "white",
                borderRadius: 5,
                fontWeight: "bolder",
                marginTop: 15,
              }}
              reactExcelClassName="react-excel"
            />
            <button
              onClick={save}
              style={{
                border: "none",
                padding: 15,
                background: "#E87C25",
                color: "white",
                borderRadius: 5,
                fontWeight: "bolder",
                marginTop: 15,
              }}
            >
              Create Students
            </button>
          </div>
        </TabPanel>
        {task && (
            <div
              style={{
                background: "white",
                padding: 20,
                borderRadius: 5,
                margin: 15
              }}
            >
              <p>Creating student accounts</p>
              {task.data.totalStudents ===
              task.data.createdStudents + task.data.failedStudents ? (
                <p>Student accounts creation job completed successfully</p>
              ) : (
                <Spinner />
              )}
              <p>
                Total student accounts to be created: {task.data.totalStudents}
              </p>
              <p>
                Student accounts created successfully:{" "}
                {task.data.createdStudents}
              </p>
              <p>
                Failed student accounts creations: {task.data.failedStudents}
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Registration;
