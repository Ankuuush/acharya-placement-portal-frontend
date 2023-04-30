import React from 'react'
import "./Search.css"
import FeatherIcon from 'feather-icons-react';

const SearchStudent = (props) => {
  const {data,setStudentData,assignLoading}=props
  const handleChange=(e)=>{
    assignLoading(true)
    if(!e.target.value)
    {
      setStudentData(data)
      assignLoading(false)
      return;
    } 

    const newArr=data.filter((item)=>
    {
      return item.student.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||item.student.lastName.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setStudentData(newArr)
    assignLoading(false)
  }
  return (
    <div className='search-root'>
        <p className='search-header'>Search Student</p>
        <div className='search-component'>
        <div className='search-box'>
            <FeatherIcon icon='search' size='20' className='search-icon'/>
            <input type='text' placeholder='Enter student name' className='search-input' onChange={handleChange}/>
        </div>
        </div>
    </div>
  )
}

export default SearchStudent