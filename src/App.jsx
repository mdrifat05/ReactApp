import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import Routes from './Routes';
import './App.css';
import Pagination from './Pagination';


function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
