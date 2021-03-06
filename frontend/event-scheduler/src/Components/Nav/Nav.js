import React from 'react';

import AuthContext from '../../context/authContext'
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = props => (
    <AuthContext.Consumer>
    {(context) => {
      return (
        <header className="nav-header">
          <div className="app-title">
            <h1>Occasion</h1>
          </div>
          <nav className="main-nav">
            <ul>
              {!context.token &&
              (<li><NavLink to="/auth">Login</NavLink></li>)}
              <li><NavLink to="/events">Events</NavLink></li>
              {context.token && (
                <React.Fragment>
                  <li><NavLink to="/bookings">RSVPs</NavLink></li>
                  <li><button onClick={context.logout}>Logout</button></li>
                </React.Fragment>
              )}
            </ul>
          </nav>
        </header>
      )
    }}
    </AuthContext.Consumer>
);

export default Nav;
