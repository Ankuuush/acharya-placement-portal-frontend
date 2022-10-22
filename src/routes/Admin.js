import React from 'react'
import { Route } from 'react-router-dom'
import AdminDashboard from '../Pages/Admin/AdminDashboard'
import ContactUs from '../Pages/ContactUs'
import FeedBack from '../Pages/FeedBack'
import PrivateRoute from '../PrivateRoute'

const Admin = () => {
  return (
    <Route element={<PrivateRoute role={"admin"}/>}>
      <Route exact path="/admin/explore-jobs" element={<AdminDashboard/>}/>
      <Route exact path="/feedback" element={<FeedBack/>}/>
      <Route exact path="/contact-us" element={<ContactUs/>}/>
    </Route>
  )
}

export default Admin