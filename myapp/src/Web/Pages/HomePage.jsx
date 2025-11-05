import React from 'react'
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>WEB WELCOMES YOU</h1>
      <NavLink to='/admin/'>
        Admin
      </NavLink>
    </div>
  )
}

export default HomePage
