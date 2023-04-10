import React, { useEffect, useState } from 'react'
import Filter from '../../Components/Filter/Filter';
import Search from '../../Components/Search/Search'
import StudentListBody from '../../Components/StudentListBody/StudentListBody'
import api from '../../api';
import { toast } from 'react-toastify';

const StudentList = () => {
  const [filterOpen, setFilterOpen] = useState(true);
  const [students,setStudents]=useState([])
  useEffect(() => {
    api.get('/tpo/students').then((response)=>{
        setStudents(response.data.data.students)
    }).catch((error)=>{
        toast.error('Server Error')
    })
  
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
  <StudentListBody students={students} />
  </div>
  </div>
  )
}

export default StudentList