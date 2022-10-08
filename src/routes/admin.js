import React from 'react'
import { Route } from 'react-router-dom'
import ContactUs from '../Pages/ContactUs'
import FeedBack from '../Pages/FeedBack'
import AdminDashboard from '../Pages/Home/AdminDashboard'
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