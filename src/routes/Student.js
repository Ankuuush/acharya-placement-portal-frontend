import { Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import Dashboard from "../Pages/Student/Dashboard";
import constants from "../Constants";
const Student = () => {
  return (
    <Route element={<PrivateRoute role={"student"} />}>
      {constants.STUDENT_MENU.map((item) => {
        return (
          <Route
            exact
            path={"/student/" + item.code}
            element={<Dashboard page={item.code} />}
          />
        );
      })}
      <Route
        exact
        path={"/student/drives/:driveid"}
        element={<Dashboard page={"drive-details"} />}
      />
      <Route
        exact
        path={"/student/application/:applicationId"}
        element={<Dashboard page={"application-details"} />}
      />
      <Route
        exact
        path={"/student/company/:companySlug"}
        element={<Dashboard page={"company-details"} />}
      />
      //404 page
      <Route path="*" element={<h1>404</h1>} />
    </Route>
  );
};

export default Student;
