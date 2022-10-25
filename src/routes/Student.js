import { Route } from "react-router-dom";
import FeedBack from "../Pages/FeedBack";
import ContactUs from "../Pages/ContactUs";
import PrivateRoute from "../PrivateRoute";
import { useState } from "react";
import StudentDashboard from "../Pages/Student/StudentDashboard";
import Resume from "../Pages/Student/Resume";
import AppliedJobs from "../Pages/Student/AppliedJobs";
import Dashboard from "../Pages/Student/Dashboard";
import constants from "../Constants";
const Student = () => {
 
  return (
    <Route element={<PrivateRoute role={"student"} />}>
      {constants.STUDENT_MENU.map((item) => {
        return (
          <Route
            exact
            path={"/student/"+item.code}
            element={<Dashboard page={item.code} />}
          />
        );
      })}
    </Route>
  );
};

export default Student;

