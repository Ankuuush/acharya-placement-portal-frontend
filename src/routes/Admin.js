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
    </Route>
  )
}

export default Admin