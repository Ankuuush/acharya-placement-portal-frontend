import React, { useEffect, useState } from 'react'
import  Spinner from '../../Components/Spinner/Spinner'
import StudentListBody from '../../Components/StudentListBody/StudentListBody'
import api from '../../api';
import { toast } from 'react-toastify';
import SearchStudent from '../../Components/Search/SearchStudent';

const StudentList = () => {
  const [students,setStudents]=useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    api.get('/tpo/students').then((response)=>{
      const res=response.data.data.students
        setStudents(res)
        setFilteredStudents(res)
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
      <SearchStudent data={students} setStudentData={setFilteredStudents} assignLoading={setLoading} />
      {loading? <Spinner />
  :<StudentListBody students={filteredStudents} />}
  </div>
  </div>
  )
}

export default StudentList