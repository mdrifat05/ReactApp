import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function UpdateBookForm() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [bookData, setBookData] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    genre: '',
    description: '',
    price: '',
    quantity: '',
    sellerEmail: ''
  });

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/books/${bookId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch book data.');
        }

        const data = await response.json();
        setBookData(data);
        setFormData({
          id: data.id,  
          title: data.title,
          author: data.author,
          genre: data.genre,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          sellerEmail: data.sellerEmail
        });
      } catch (error) {
        console.error('Error fetching book data:', error);
        // Handle error state or display an error message
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/update/${bookId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to update book data.');
      }
     
      // Handle successful update, redirect, or show success message
      alert('Book data updated successfully!');
      navigate('/SellerDashboard');
    } catch (error) {
      console.error('Error updating book data:', error);
      // Handle error state or display an error message
    }
  };

  return (
    <div className="container">
      <h1>Update Book</h1>
      {bookData ? (
        <form id="updateBookForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select
              className="form-control"
              id="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            >
              <option value="">Select Genre</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Mystery">Mystery</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-register">
            Update
          </button>
        </form>
      ) : (
        <div>Loading book data...</div>
      )}
    </div>
  );
}

export default UpdateBookForm;
