import React from 'react'
import { Route } from 'react-router-dom'
import constants from '../Constants'
import PrivateRoute from '../PrivateRoute'
import TpoDashboard from '../Pages/TPO/TpoDashboard'

const Tpo = () => {
  return (
    <Route element={<PrivateRoute role={"tpo"} />}>
      {constants.TPO_MENU.map((item) => {
        return (
          <Route
            exact
            path={"/tpo/"+item.code}
            element={<TpoDashboard page={item.code} />}
          />
        );
      })}
      <Route
        exact
        path={"/tpo/drives/:driveid"}
        element={<TpoDashboard page={"drive-details"} />}
      />
      <Route
        exact
        path={"/tpo/post-jobs/preview"}
        element={<TpoDashboard page={"job-preview"} /> }
      />
      <Route
        exact
        path={"/tpo/post-jobs/students"}
        // element={<h1>HIIII</h1> }
        element={<TpoDashboard page={"preview-students"} /> }
      />
    </Route>
  )
}

export default Tpo