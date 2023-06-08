import React from 'react';
import './App.css';

function LoginPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      // Perform login logic asynchronously
      console.log('Performing login...');
      // Simulating an API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Make API call for authentication and retrieving user's role
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const userRole = data.role; // Assuming the API response includes the user's role

        console.log('Login successful!');
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('User Role:', userRole);

        // Redirect the user based on their role
        if (userRole === 'seller') {
          window.location.href = '/seller-dashboard'; // Redirect to the seller dashboard
        } else if (userRole === 'customer') {
          window.location.href = '/customer-dashboard'; // Redirect to the admin dashboard
        } else {
          // Handle other roles or show an error message
          console.error('Invalid user role:', userRole);
        }
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
      <div>
        <h1>Login Page</h1>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" style={{ width: '400px' }} id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" style={{ width: '400px' }} id="password" required />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
