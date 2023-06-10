import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const location = useLocation();

  useEffect(() => {
    const sellerEmail = localStorage.getItem('LoggedSellerEmail');
    if (sellerEmail) {
      setIsLoggedIn(true);
      setUserEmail(sellerEmail);
      setUserRole('seller');
    } else {
      const customerEmail = localStorage.getItem('LoggedCustomerEmail');
      if (customerEmail) {
        setIsLoggedIn(true);
        setUserEmail(customerEmail);
        setUserRole('customer');
      } else if (location.pathname !== '/Login') {
        // Redirect to the login page if no email exists and not on the login page
        window.location.href = '/Login';
      }
    }
  }, [location.pathname]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setUserRole('');
    localStorage.removeItem('LoggedSellerEmail');
    localStorage.removeItem('LoggedCustomerEmail');
    window.location.href = '/Login'; // Redirect to the login page after logout
  };

  const renderHomeButton = () => {
    if (isLoggedIn) {
      if (userRole === 'seller') {
        return (
          <li className="nav-item active">
            <Link to="/SellerDashboard" className="nav-link">
              Home
            </Link>
          </li>
        );
      } else {
        return (
          <li className="nav-item active">
            <Link to="/CustomerDashboard" className="nav-link">
              Home
            </Link>
          </li>
        );
      }
    }
    return null;
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
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
            {renderHomeButton()}
            {!isLoggedIn && (
              <>
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
              </>
            )}
            {isLoggedIn && (
              <>
                {userRole === 'seller' && (
                  <li className="nav-item">
                    <Link to="/AddBook" className="nav-link">
                      Add Book
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link to={`/${userRole}-profile`} className="nav-link">
                    {userRole === 'seller' ? 'Seller Profile' : 'Customer Profile'}
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link btn btn-link">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
