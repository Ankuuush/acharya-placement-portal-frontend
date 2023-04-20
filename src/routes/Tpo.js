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
        element={<TpoDashboard page={"preview-students"} /> }
      />
      <Route
        exact
        path={"/tpo/student-details"}
        // element={<h2>hii</h2> }
        element={<TpoDashboard page={"student-details"} /> }
      />
    </Route>
  )
}

export default Tpo