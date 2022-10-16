import React from 'react'
import CertificationItem from './CertificationItem'

const Certifications = ({data}) => {
  return (
    <div> <h3>Certifications</h3>
    {data.map((item) => (
    <CertificationItem key={item._id} item={item} />
  ))}</div>
  )
}

export default Certifications