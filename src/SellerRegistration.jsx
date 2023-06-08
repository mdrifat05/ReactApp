import React, { useState, useEffect } from 'react';
import './App.css'
import { useNavigate } from 'react-router-dom';
function SellerRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    //random id for each user
    id : Math.floor(Math.random() * 10000),
    name: '',
    shopname: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
    address: '',
    joined: '',
  });

const [formErrors, setErrors] = useState({});
const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { id, value, type } = e.target;
    
   if (type == 'radio') {
      setFormData({
        ...formData,
        gender: value,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(formData));
    setIsSubmit(true);
  };
  
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const registerUser = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/saveSellerData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log('Data saved on the server:', data);
            alert('Registration Successful');
            navigate('/Login');
          } else {
            throw new Error('Error saving data');
          }
        } catch (error) {
          console.error('Error saving data:', error);
        }
      };
  
      registerUser();
    }
  }, [formErrors]);
  
  
    const validate = (values)=>{
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const nameRegex = /^[a-zA-Z.\s]{3,}$/;

    if(!values.name){
        errors.name = 'Name cannot be empty';
    }else if(!nameRegex.test(values.name)){
        errors.name = 'Name must be at least 3 characters long and contain only alphabetic characters';
    }
    if(!values.shopname){
        errors.shopname = 'Shop Name is required';
    }else if(!nameRegex.test(values.shopname)){
        errors.name = 'Shop Name must be at least 3 characters long and contain only alphabetic characters';
    }
    if(!values.email){
        errors.email = 'Email cnnot be empty';
    }else if(!emailRegex.test(values.email)){
        errors.email = 'Input a Valid Email Address';
    }
    if(!values.password){
        errors.password = 'Password is required';
    }else if(values.password.length < 8){
        errors.password = 'Password must be more than 8 characters';
    }
    if(!values.gender){
        errors.gender = 'please select your gender';
    }
    if(!values.phone){
        errors.phone = 'Phone Number is required';
    }else if(values.phone.length > 11 || values.phone.length < 11){
        errors.phone = 'Phone Number must be 11 characters';
    }
    if(!values.address){
        errors.address = 'Address cannot be empty';
    }
    if(!values.joined){
        errors.joined = 'Joining Date cannot be empty';
    }
    return errors; 
}

  return (
    <div>
      <div className="container"> 
        <h3 className='header'>Seller Registration</h3>
        <form onSubmit={handleSubmit} method='POST'>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter Your Name" value={formData.name} onChange={handleChange}/>
          </div>
          <p className='form-group error-message'>{formErrors.name}</p>
          <div className="form-group">
            <label htmlFor="shopname">Shop Name</label>
            <input type="text" className="form-control" id="shopname" placeholder="Enter Your Shop Name" value={formData.shopname} onChange={handleChange}/>
          </div>
          <p className='form-group error-message'>{formErrors.shopname}</p>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter Your Email" value={formData.email} onChange={handleChange}/>
          </div>
          <p className='form-group error-message'>{formErrors.email}</p>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter Your Password" value={formData.password} onChange={handleChange}/>
          </div>
          <p className='form-group error-message'>{formErrors.password}</p>
          <div className="form-group">
            <label>Gender</label>
            <div className="form-check">
            <label className="form-check-label" htmlFor="male">Male</label>
            <input className="form-check-input" type="radio" name="gender" id="male" value="Male" onChange={handleChange}/>
            </div>
            <div className="form-check">
            <label className="form-check-label" htmlFor="female">Female</label>
            <input className="form-check-input" type="radio" name="gender" id="female"value="Female" onChange={handleChange}/>
            </div>
        </div>
        <p className='form-group error-message'>{formErrors.gender}</p>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="number" className="form-control" id="phone" placeholder="Enter Your Phone Number" value={formData.phone} onChange={handleChange}/>
          </div>
        <p className='form-group error-message'>{formErrors.phone}</p>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea className="form-control" id="address" rows="4" placeholder="Enter the shop address" value={formData.address} onChange={handleChange}></textarea>
          </div>
        <p className='form-group error-message'>{formErrors.address}</p>
          <div className="form-group">
            <label htmlFor="joined">Join Date</label>
            <input type="date" className="form-control" id="joined" value={formData.joined} onChange={handleChange}/>
          </div>
        <p className='form-group error-message'>{formErrors.joined}</p>
          <button type="submit" className="btn btn-primary btn-register"> Register
          </button>
        </form>
      </div>

    </div>
  );
}
export default SellerRegistration;
