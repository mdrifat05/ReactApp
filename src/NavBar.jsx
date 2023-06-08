import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          Rifats Book Store
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
            <Link to="/Home" className="nav-link">
              Home
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/SellerRegistration" className="nav-link">
              Registration
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/Login" className="nav-link">
              Login
            </Link>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li> */}
          </ul>
        </div>
      </nav>
    </>
     )
 }
export default NavBar;