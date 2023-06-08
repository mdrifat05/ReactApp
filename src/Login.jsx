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
      console.log('Login successful!');
      console.log('Email:', email);
      console.log('Password:', password);
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
