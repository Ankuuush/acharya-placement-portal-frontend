import React from 'react'
import "./Search.css"
import FeatherIcon from 'feather-icons-react';

const Search = (props) => {
  const {data,setDriveData,assignLoading,toggleFilter,filter,loading}=props
  const handleChange=(e)=>{
    assignLoading(true)
    if(!e.target.value)
    {
      setDriveData(data)
      return;
    } 

    const newArr=data.filter((item)=>
    {
      return item.role.toLowerCase().includes(e.target.value.toLowerCase()) ||item.company.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setDriveData(newArr)
  }
  return (
    <div className='search-root'>
        <p className='search-header'>Search Drives</p>
        <div className='search-component'>
        <div className='search-box'>
            <FeatherIcon icon='search' size='20' className='search-icon'/>
            <input type='text' placeholder='Enter a job title/company name' className='search-input' onChange={handleChange}/>
        </div>
        <button className='filter-button' onClick={toggleFilter} style={{borderBottom: props.filter ? "4px solid #29a329": null}}> <FeatherIcon icon='filter' size='13'/> Filters</button>
        </div>
    </div>
  )
}

export default Search