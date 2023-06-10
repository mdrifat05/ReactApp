import React from 'react';

function SellerProfile() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2>Seller Profile</h2>
            </div>
            <div className="card-body">
              <p>
                <strong>Name:</strong> <span id="name"></span>
              </p>
              <p>
                <strong>Store Name:</strong> <span id="shopname"></span>
              </p>
              <p>
                <strong>Email:</strong> <span id="email"></span>
              </p>
              <p>
                <strong>Gender:</strong> <span id="gender"></span>
              </p>
              <p>
                <strong>Phone:</strong> <span id="phone"></span>
              </p>
              <p>
                <strong>Address:</strong> <span id="address"></span>
              </p>
              <p>
                <strong>Join Date:</strong> <span id="joindate"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerProfile;
