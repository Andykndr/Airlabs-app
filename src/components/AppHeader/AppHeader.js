import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../resources/logo.png';
import './AppHeader.scss';

export default function AppHeader() {
  const [burger, setBurger] = useState(false);
  const location = useLocation();
  const toggleBurger = () => {
    setBurger(!burger);
  };

  return (
    <div className="app-header-section">
      <div className="header-links">
        <Link to="/" className="header-logo">
          <img src={logo} alt="logo" className="main-logo" />
        </Link>
        <ul
          className={burger ? 'header-navigation-active' : 'header-navigation'}
        >
          <Link
            to="/flight-info"
            className={
              location.pathname === '/flight-info'
                ? 'header-link-active'
                : 'header-link'
            }
          >
            Flight info
          </Link>
          <Link
            to="/nearby"
            className={
              location.pathname === '/nearby'
                ? 'header-link-active'
                : 'header-link'
            }
          >
            NearBy Geo
          </Link>
          <Link
            to="/schedules"
            className={
              location.pathname === '/schedules'
                ? 'header-link-active'
                : 'header-link'
            }
          >
            Schedules
          </Link>
        </ul>
        <div
          onClick={() => toggleBurger()}
          className={burger ? 'burger active' : 'burger'}
        >
          <span></span>
        </div>
      </div>
    </div>
  );
}
