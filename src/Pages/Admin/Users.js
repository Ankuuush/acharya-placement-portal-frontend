import React, { useEffect, useState } from 'react'
import api from '../../api'


const UserItem=({user})=>{
  return (
    <div style={{display:"grid",gridTemplateColumns:"20% 20% 40% 10%",gridColumnGap:"50px", padding:"20px 0",fontWeight:700,color:"#1E4786"}}>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <p>{user.email}</p>
      <p>{user.role}</p>
    </div>
  )
}
const Users = () => {
  const [users, setUsers] = useState([])
  // {
  //   "_id": "630cbcd2021a94172b206b0a",
  //   "firstName": "TPO",
  //   "lastName": "1st",
  //   "email": "beistpotest@acharya.ac.in",
  //   "createdOn": 1661779147835,
  //   "blacklisted": false,
  //   "uid": "xGlb92SET4PkHGKZgs8GXuYNrAX2",
  //   "role": "tpo",
  //   "authorityMeta": {
  //     "department": "BEIS",
  //     "active": true
  //   },
  //   "created_by": "NCjRELqg8OfrecUpacleJ01tFiu2",
  //   "slug": "tpo-1st",
  //   "__v": 0
  // },
  useEffect(() => {
    api.get('/admin/users').then((response)=>{
      const res=response.data.data.users
      setUsers(res)
    })
  }, [])
  
  return (
    <div>
      <h1>Users</h1>
      <div style={{
        display: "flex",
        flexDirection:"column",
        boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
        padding: 30,
        background: "white",
        borderRadius: 15,
        width:"70%",
        margin:"2rem auto"
      }}>
        <div style={{display:"grid",gridTemplateColumns:"20% 20% 40% 10%",gridColumnGap:"50px",color:"#1E4786"}}>
      <h2>FirstName</h2>
      <h2>LastName</h2>
      <h2>Email</h2>
      <h2>Role</h2>
    </div>
    <hr />
      {users.map((item,i)=>{
        return <UserItem key={i} user={item} />
      })}
      </div>
    </div>
  )
}

export default Users