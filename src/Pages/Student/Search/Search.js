import React from 'react'
import "./Search.css"
import FeatherIcon from 'feather-icons-react';

const Search = (props) => {
  return (
    <div className='search-root'>
        <p className='search-header'>Search Drives</p>
        <div className='search-component'>
        <div className='search-box'>
            <FeatherIcon icon='search' size='20' className='search-icon'/>
            <input type='text' placeholder='Enter a job title' className='search-input'/>
        </div>
        <button className='filter-button' onClick={props.toggleFilter} style={{borderBottom: props.filter ? "4px solid #29a329": null}}> <FeatherIcon icon='filter' size='13'/> Filters</button>
        </div>
    </div>
  )
}

export default Search