import React from 'react'

const PersonalInformation = ({data}) => {
  return (
    <>
    <h3>Personal Info</h3>
    <img src={data?.photoUrl} alt='Profile Picture' style={{width:"5rem", height:"5rem"}}/>
    <div>{data?.gender}</div>
    <button>Edit</button>
    </>
  )
}

export default PersonalInformation