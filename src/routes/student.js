import { Route } from "react-router-dom";
import StudentDashboard from "../Pages/Home/StudentDashboard"
import FeedBack from "../Pages/FeedBack"
import ContactUs from "../Pages/ContactUs"
import PrivateRoute from "../PrivateRoute";
import Resume from "../Pages/Resume";
import ProfileForm from "../Pages/Profile Form/ProfileForm";
import { useState } from "react";
const Student = () => {
  const [activeStep, setActiveStep] = useState(0)
  return (
    <Route element={<PrivateRoute role={"student"}/>}>
      <Route exact path="/student/explore-jobs" element={<StudentDashboard activeStep={activeStep} setActiveStep={setActiveStep}/>}/>
      <Route exact path="/student/applied-jobs" element={<StudentDashboard/>}/>
      <Route exact path="/student/resume" element={<Resume/>}/>
      <Route exact path="/student/update-resume" element={<ProfileForm activeStep={activeStep} setActiveStep={setActiveStep}/>}/>
      <Route exact path="/feedback" element={<FeedBack/>}/>
      <Route exact path="/contact-us" element={<ContactUs/>}/>
    </Route>
  );
};

export default Student;
