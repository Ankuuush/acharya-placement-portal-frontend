import React, { useState } from 'react'
import Filter from '../../Components/Filter/Filter';
import Search from '../../Components/Search/Search'
import StudentListBody from '../../Components/StudentListBody/StudentListBody'

const StudentList = () => {
  const [filterOpen, setFilterOpen] = useState(true);
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
  <StudentListBody />
  </div>
  {filterOpen && (
        <Filter
          // assignFilter={assignFilter}
          // filterArray={filterArray}
          // setFilterArray={setFilterArray}
        />
      )}
  </div>
  )
}

export default StudentList