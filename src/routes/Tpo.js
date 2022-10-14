import React from 'react'
import { Route } from 'react-router-dom'
import Tpodashboard from "../Pages/Home/Tpodashboard"
import ContactUs from '../Pages/ContactUs'
import FeedBack from '../Pages/FeedBack'
import PrivateRoute from '../PrivateRoute'

const Tpo = () => {
  return (
    <Route element={<PrivateRoute role={"tpo"}/>}>
      <Route exact path="/tpo/explore-jobs" element={<Tpodashboard/>}/>
      <Route exact path="/tpo/post-jobs" element={<Tpodashboard/>}/>
      <Route exact path="/tpo/student-list" element={<Tpodashboard/>}/>
      <Route exact path="/tpo/registration" element={<Tpodashboard/>}/>
      <Route exact path="/feedback" element={<FeedBack/>}/>
      <Route exact path="/contact-us" element={<ContactUs/>}/>
    </Route>
  )
}

export default Tpo