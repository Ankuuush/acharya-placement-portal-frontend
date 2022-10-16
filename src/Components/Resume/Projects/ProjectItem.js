import React from 'react'

const ProjectItem = ({item}) => {
  return (
    <div>
        {item.title}
        <p>{item.link}</p>
        <button>Edit</button>
    </div>
  )
}

export default ProjectItem