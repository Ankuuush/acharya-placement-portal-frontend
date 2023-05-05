import React from 'react'
import { Route } from 'react-router-dom'
import constants from '../Constants'
import AdminDashboard from '../Pages/Admin/AdminDashboard'
import PrivateRoute from '../PrivateRoute'

const Admin = () => {
  return (
    <Route element={<PrivateRoute role={"admin"} />}>
      {constants.ADMIN_MENU.map((item) => {
        return (
          <Route
            exact
            path={"/admin/"+item.code}
            element={<AdminDashboard page={item.code} />}
          />
        );
      })}
      <Route
        exact
        path={"/admin/drives/:driveid"}
        // element={<h1>hii</h1>}
        element={<AdminDashboard page={"drive-details"} />}
      />
      <Route
        exact
        path={"/admin/drives/:driveid/students"}
        // element={<h1>hiii</h1> }
        element={<AdminDashboard page={"preview-students"} /> }
      />
      <Route
        exact
        path={"/admin/student-details"}
        // element={<h2>hiii</h2> }
        element={<AdminDashboard page={"student-details"} /> }
      />
    </Route>
  )
}

export default Admin