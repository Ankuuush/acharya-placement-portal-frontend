import React from 'react'
import ProjectItem from './ProjectItem'

const Projects = ({data}) => {
  return (
    <div>
        <h3>Projects</h3>
        {data.map((item) => (
        <ProjectItem key={item._id} item={item} />
      ))}
        </div>
  )
}

export default Projects