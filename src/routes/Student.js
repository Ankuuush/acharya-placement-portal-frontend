import { Route } from "react-router-dom";
import FeedBack from "../Pages/FeedBack";
import ContactUs from "../Pages/ContactUs";
import PrivateRoute from "../PrivateRoute";
import { useState } from "react";
import StudentDashboard from "../Pages/Student/StudentDashboard";
import Resume from "../Pages/Student/Resume";
import AppliedJobs from "../Pages/Student/AppliedJobs";
const Student = () => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <Route element={<PrivateRoute role={"student"} />}>
      <Route
        exact
        path="/student/explore-jobs"
        element={
          <StudentDashboard
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        }
      />
      <Route exact path="/student/applied-jobs" element={<AppliedJobs />} />
      <Route exact path="/student/resume" element={<Resume />} />
      <Route exact path="/feedback" element={<FeedBack />} />
      <Route exact path="/contact-us" element={<ContactUs />} />
    </Route>
  );
};

export default Student;
