import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SellerRegistration from './SellerRegistration';
import Home from './Home';
import Login from './Login';
import SellerProfile from './seller-profile';
import AddBook from './AddBook';
import SellerDashboard from './SellerDashboard';
import CustomerDashboard from './CustomerDashboard';
import UpdateBook from './UpdateBook';

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SellerRegistration" element={<SellerRegistration />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/seller-profile" element={<SellerProfile />}/>
        <Route path="/AddBook" element={<AddBook />}/>
        <Route path="SellerDashboard" element={<SellerDashboard />}/>
        <Route path="CustomerDashboard" element={<CustomerDashboard />}/>
        <Route path="/UpdateBook/:bookId" element={<UpdateBook />} />
      </Routes>
    </>
  );
}

export default Routing;
