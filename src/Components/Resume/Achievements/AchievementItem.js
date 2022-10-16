import React from 'react'

const AchievementItem = ({item}) => {
  return (
    <div>
        <p>{item.title}</p>
        <p>{item.link}</p>
        <button>Edit</button>
    </div>
  )
}

export default AchievementItem