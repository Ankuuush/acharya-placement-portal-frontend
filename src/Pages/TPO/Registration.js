import React, {useState, useEffect} from "react";
import SignupForm from "../SignUp/SignupForm";
import { ReactExcel, readFile, generateObjects } from '@ramonak/react-excel';
import api from "../../api";
import Spinner from "../../Components/Spinner/Spinner";

const Registration = () => {
  const [initialData, setInitialData] = useState(undefined);
  const [currentSheet, setCurrentSheet] = useState({});
  const [task, setTask] = useState(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    //read excel file
    readFile(file)
      .then((readedData) => setInitialData(readedData))
      .catch((error) => console.error(error));
  };

  async function poll(id) {
    let taskT = await getTaskStatus(id);
    const interval = setInterval(() => {
      taskT = getTaskStatus(id);
    }, 500);

    console.log(task);
    if(task.data.totalStudents === (task.data.createdStudents + task.data.failedStudents)){
      clearInterval(interval);
    }
  }

  const getTaskStatus = (id) => {
      api.get("tpo/tasks/" + id).then((res) => {
        setTask(res.data.data.task);
        return res.data.data.task;
      });
  }

  const save = () => {
    const result = generateObjects(currentSheet);
    //save array of objects to backend
    api.post("tpo/students/add", {students: result, batch: 19}).then((res) => {
      setTask(res.data.data.task);
      poll(res.data.data.task._id)
    });
    console.log(result);
  };
  return (
    <div>
      

    <div style={{background: "white", padding: 15, borderRadius: 10}}>
      <h4>Add A List Of Students</h4>
      <p>Upload an excel file of a list of students from your department and click on add students, this will then create and add students onto the platform</p>

    <input
      type='file'
      accept='.xlsx'
      onChange={handleUpload}

      style={{border: "none", padding: 15, background: "orange", color: "white", borderRadius: 5, fontWeight: "bolder",marginTop: 15}}
    />
    <br/>
    <br/>

    <ReactExcel
      initialData={initialData}
      onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
      activeSheetClassName='active-sheet'

      style={{border: "none", padding: 15, background: "orange", color: "white", borderRadius: 5, fontWeight: "bolder",marginTop: 15}}
      reactExcelClassName='react-excel'
    />
    <button onClick={save} style={{border: "none", padding: 15, background: "orange", color: "white", borderRadius: 5, fontWeight: "bolder",marginTop: 15}}>

        Save to API
    </button>
    </div>
    {task && <div style={{marginTop: 20, background: "white", padding: 10, borderRadius: 5}}>
      <p>Creating student accounts</p>
      {task.data.totalStudents === (task.data.createdStudents + task.data.failedStudents) ? <p>Student accounts creation job completed successfully</p>: <Spinner/>}
      <p>Total student accounts to be created: {task.data.totalStudents}</p>
      <p>Student accounts created successfully: {task.data.createdStudents}</p>
      <p>Failed student accounts creations: {task.data.failedStudents}</p>
      </div>}

      {/* <div style={{ width: "50%",

    boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
    padding: 20,
    background: "white",
    borderRadius: 15,
    margin:"2rem auto" }}>
      <h3>Register Student</h3>
      <SignupForm toastText={"Student Registeration Successful!!"}/>
    </div> */}
    </div>
    </div>
  );
};

export default Registration;
