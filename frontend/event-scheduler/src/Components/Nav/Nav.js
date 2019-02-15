import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.css';

const Nav = (props) => {
  return (
    <header className="nav-header">
      <div className="app-title">
        <h1>Occasion</h1>
      </div>
      <nav className="main-nav">
        <ul>
          <li><NavLink to="/auth">Authenticate</NavLink></li>
          <li><NavLink to="/events">Events</NavLink></li>
          <li><NavLink to="/bookings">Bookings</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default Nav
