import React from 'react'
import EducationDetailsItem from './EducationDetailsItem'

const EducationDetails = ({data}) => {
  return (
    <div>
        <h3>Education Details</h3>
        <EducationDetailsItem data={data.tenth}/>
        <EducationDetailsItem data={data.twelfth}/>
        <EducationDetailsItem data={data.ug}/>
    </div>
  )
}

export default EducationDetails