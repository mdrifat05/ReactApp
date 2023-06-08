import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SellerRegistration from './SellerRegistration';
import Home from './Home';
import Login from './Login';

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SellerRegistration" element={<SellerRegistration />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}

export default Routing;
