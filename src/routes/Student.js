import { Route } from "react-router-dom";
import FeedBack from "../Pages/FeedBack";
import ContactUs from "../Pages/ContactUs";
import PrivateRoute from "../PrivateRoute";
import { useState } from "react";
import StudentDashboard from "../Pages/Student/StudentDashboard";
import Resume from "../Pages/Student/Resume";
import AppliedJobs from "../Pages/Student/AppliedJobs";
import Dashboard from "../Pages/Student/Dashboard";
const Student = () => {
 
  return (
    <Route element={<PrivateRoute role={"student"} />}>
      <Route
        exact
        path="/student/explore-jobs"
        element={
          <Dashboard page={"Explore Jobs"}/>
        }
      />
      <Route exact path="/student/applied-jobs" element={<Dashboard page={"Applied Jobs"}/>} />
      <Route exact path="/student/resume" element={<Dashboard page={"Build Resume"}/>} />
      <Route exact path="/feedback" element={<Dashboard page={"Feedback"}/>} />
      <Route exact path="/contact-us" element={<Dashboard page={"Contact Us"}/>} />
    </Route>
  );
};

export default Student;
