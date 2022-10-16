import React from 'react'

const InternshipItem = ({item}) => {
  return (
    <div>
        {item.companyName}
        <p>{item.role}</p>
        <button>Edit</button>
    </div>
  )
}

export default InternshipItem