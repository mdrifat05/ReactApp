import React, { useEffect, useState } from 'react';

function SellerProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loggedSellerEmail = localStorage.getItem('LoggedSellerEmail');

    fetch('http://localhost:3000/api/GetSellerProfile', {
      headers: {
        loggedselleremail: loggedSellerEmail,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2>Seller Profile</h2>
            </div>
            <div className="card-body">
              {profile ? (
                <>
                  <p>
                    <strong>Name:</strong> <span id="name">{profile.name}</span>
                  </p>
                  <p>
                    <strong>Store Name:</strong> <span id="shopname">{profile.shopname}</span>
                  </p>
                  <p>
                    <strong>Email:</strong> <span id="email">{profile.email}</span>
                  </p>
                  <p>
                    <strong>Gender:</strong> <span id="gender">{profile.gender}</span>
                  </p>
                  <p>
                    <strong>Phone:</strong> <span id="phone">{profile.phone}</span>
                  </p>
                  <p>
                    <strong>Address:</strong> <span id="address">{profile.address}</span>
                  </p>
                  <p>
                    <strong>Join Date:</strong> <span id="joindate">{profile.joined}</span>
                  </p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerProfile;
