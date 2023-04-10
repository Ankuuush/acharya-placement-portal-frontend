import React, { useEffect, useState } from 'react'
import Search from '../../../Components/Search/Search'
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import api from '../../../api';
import StudentListBody from '../../../Components/StudentListBody/StudentListBody';

const ShortlistedStudents = () => {
  const [students,setStudents]=useState([])
  const location=useLocation()
  const {eligibilityData}=location.state
  useEffect(() => {
    console.log(eligibilityData)
    // api.get('/tpo/eligibility/calculate',eligibilityData).then((response)=>{
    //     setStudents(response.data.data.students)
    //     console.log(response)
    // }).catch((error)=>{
    //     toast.error('Server Error')
    // })
  
  }, [])
  return (
    <div style={{height: "auto",
      padding: "5px",
      display: "flex",
      backgroundColor:"#f3f4f8"}}>
      <div style={{flex:"4", height:"fitContent"}}>
      <Search
    // data={drives}
    // setDriveData={setDriveData}
    // assignLoading={assignLoading}
    // toggleFilter={toggleFilter}
    // filter={filterOpen}
    // loading={loading}
    // assignFilter={assignFilter}
    />
  {/* <StudentListBody students={students} /> */}
  </div>
  </div>
  )
}

export default ShortlistedStudents