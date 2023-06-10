import React, { useState, useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function AddBooks() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: Math.floor(Math.random() * 10000),
    title: '',
    author: '',
    genre: '',
    price: '',
    description: '',
    quantity: '',
  });

  const [formErrors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  
    // Re-validate the form and update the errors
    setErrors(validateForm({ ...formData, [id]: value }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(formData));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // Form is valid, proceed with form submission logic
      const submitForm = async () => {
        try {
          // Perform form submission logic here
          // For example, send a POST request to the server with form data
          const response = await fetch('http://localhost:3000/api/addBook', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Data saved on the server:', data);
            alert('Book added successfully');
            // Clear form fields
            setFormData({
              title: '',
              author: '',
              genre: '',
              price: '',
              description: '',
              quantity: '',
            });
          } else {
            throw new Error('Error saving data');
          }
        } catch (error) {
          console.error('Error saving data:', error);
        }
      };

      submitForm();
      setIsSubmit(false);
    }
  }, [formErrors, isSubmit, formData]);

  const validateForm = (values) => {
    const errors = {};

    if (!values.title.trim()) {
      errors.title = 'Title cannot be empty';
    }else if (values.title.length < 2) {
        errors.title = 'Title must be at least 2 characters';
    }
    if (!values.author.trim()) {
      errors.author = 'Author Name required';
    }else if(values.title.length < 2){
        errors.author = 'Author Name must be at least 2 characters';
    }

    if (!values.genre) {
      errors.genre = 'Genre is required';
    }

    if (!values.price.trim()) {
      errors.price = 'Price is required';
    } else if (parseFloat(values.price) < 0) {
      errors.price = 'Price must be greater than 0';
    }

    if (!values.description.trim()) {
      errors.description = 'Description is required';
    }

    if (!values.quantity.trim()) {
      errors.quantity = 'Quantity is required';
    } else if (parseInt(values.quantity) < 0) {
      errors.quantity = 'Quantity must be greater than 0';
    }

    return errors;
  };

  return (
    <div className="container">
      <h1 className="form-group">Add Books</h1>
      <form id="addbookForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className={`form-control ${formErrors.title ? 'is-invalid' : ''}`}
            id="title"
            placeholder="Enter the book title"
            value={formData.title}
            onChange={handleChange}
          />
          {formErrors.title && <div className="invalid-feedback">{formErrors.title}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            className={`form-control ${formErrors.author ? 'is-invalid' : ''}`}
            id="author"
            placeholder="Enter the book author"
            value={formData.author}
            onChange={handleChange}
          />
          {formErrors.author && <div className="invalid-feedback">{formErrors.author}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <select
            className={`form-control ${formErrors.genre ? 'is-invalid' : ''}`}
            id="genre"
            value={formData.genre}
            onChange={handleChange}
          >
            <option value="">Select a genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Mystery">Mystery</option>
          </select>
          {formErrors.genre && <div className="invalid-feedback">{formErrors.genre}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className={`form-control ${formErrors.price ? 'is-invalid' : ''}`}
            id="price"
            placeholder="Enter the book price"
            value={formData.price}
            onChange={handleChange}
          />
          {formErrors.price && <div className="invalid-feedback">{formErrors.price}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
            id="description"
            rows="4"
            placeholder="Enter the book description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          {formErrors.description && <div className="invalid-feedback">{formErrors.description}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            className={`form-control ${formErrors.quantity ? 'is-invalid' : ''}`}
            id="quantity"
            placeholder="Enter the book quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          {formErrors.quantity && <div className="invalid-feedback">{formErrors.quantity}</div>}
        </div>

        <button type="submit" className="btn btn-primary btn-register">
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBooks;
