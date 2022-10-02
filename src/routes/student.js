import React from "react";
import { Route } from "react-router-dom";
import StudentDashboard from "../Pages/Home/studentDashboard"
import FeedBack from "../Pages/FeedBack"
import ContactUs from "../Pages/ContactUs"
import PrivateRoute from "../PrivateRoute";
const student = () => {
  return (
    <Route element={<PrivateRoute role={"student"}/>}>
      <Route exact path="/student/explore-jobs" element={<StudentDashboard/>}/>
      <Route exact path="/student/applied-jobs" element={<StudentDashboard/>}/>
      <Route exact path="/student/resume" element={<StudentDashboard/>}/>
      <Route exact path="/feedback" element={<FeedBack/>}/>
      <Route exact path="/contact-us" element={<ContactUs/>}/>
    </Route>
  );
};

export default student;
