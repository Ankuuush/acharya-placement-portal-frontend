import React from 'react'
import "./Filter.css"

const Filter = () => {
  return (
    <div className='filter-root'>
        <p className='filter-header'>Filter Drives</p>
        <p className='filter-subheader'>Job Location</p>
        <input type="checkbox" id="location1" name="location1" value="location1"/>
        <label for="location1" className='check-labels'>Remote</label><br/>
        <input type="checkbox" id="location2" name="location1" value="location1"/>
        <label for="location2" className='check-labels'>On-Site</label><br/>
        <p className='filter-subheader'>Job Type</p>
        <input type="checkbox" id="location1" name="location1" value="location1"/>
        <label for="location1" className='check-labels'>Fulltime</label><br/>
        <input type="checkbox" id="location2" name="location1" value="location1"/>
        <label for="location2" className='check-labels'>Internship</label><br/>
        <p className='filter-subheader'>Compensation</p>
        <input type="checkbox" id="location1" name="location1" value="location1"/>
        <label for="location1" className='check-labels'>Upto 5 lacs</label><br/>
        <input type="checkbox" id="location2" name="location1" value="location1"/>
        <label for="location2" className='check-labels'>Upto 10 lacs</label><br/>
        <input type="range" min="0" max="100" value="50" className="slider" id="myRange"/>
    </div>
  )
}

export default Filter