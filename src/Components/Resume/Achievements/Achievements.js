import React from 'react'
import AchievementItem from './AchievementItem'

const Achievements = ({data}) => {
  return (
    <div> <h3>Achievements</h3>
    {data.map((item) => (
    <AchievementItem key={item._id} item={item} />
  ))}</div>
  )
}

export default Achievements