import React from 'react'

const CertificationItem = ({item}) => {
  return (
    <div>
        <p>{item.organization}</p>
        <p>{item.name}</p>
        <button>Edit</button>
    </div>
  )
}

export default CertificationItem