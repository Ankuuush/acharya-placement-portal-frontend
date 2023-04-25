import React, { useState } from 'react'
import Filter from '../../Components/Filter/Filter';
import Search from '../../Components/Search/Search'
import CompanyStudentListBody from './CompanyStudentListBody';

const CompanyStudentList = () => {
  const [filterOpen, setFilterOpen] = useState(true);
  return (
    <div style={{height: "auto",
      padding: "5px",
      display: "flex",
      backgroundColor:"#f3f4f8"}}>
      <div style={{flex:"4", height:"fitContent"}}>
  <CompanyStudentListBody />
  </div>
  </div>
  )
}

export default CompanyStudentList