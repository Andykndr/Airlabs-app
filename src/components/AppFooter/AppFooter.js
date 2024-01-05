import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../resources/logo.png';
import './AppFooter.scss';

export default function AppFooter() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-footer">
      <div className="app-footer-block">
        <div className="app-footer-social">
          <Link onClick={() => handleClick()} to="/" className="footer-logo">
            <img src={logo} alt="logo" className="main-logo" />
          </Link>
        </div>

        <div className="app-footer-social">
          <h2 className="social-header">Social media</h2>
          <ul className="footer-link">
            <li>Facebook</li>
            <li>Instagram </li>
            <li>Twitter</li>
          </ul>
        </div>
        <div className="app-footer-social">
          <h2 className="social-header">Contact</h2>
          <ul className="footer-link">
            <li>Airlabs corp.</li>
            <li>Dresden Str.123 </li>

            <li>02-133</li>
            <li>+33999-22-5522</li>
          </ul>
        </div>
      </div>
      <div className="app-footer-year">
        &copy; {new Date().getFullYear()} Airlabs corporation. All rights
      </div>
    </div>
  );
}
