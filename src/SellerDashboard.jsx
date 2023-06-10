import React from 'react';
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SellerBookList() {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCheckboxChange = (bookId) => {
    setSelectedBooks((prevSelectedBooks) => {
      if (prevSelectedBooks.includes(bookId)) {
        return prevSelectedBooks.filter((id) => id !== bookId);
      } else {
        return [...prevSelectedBooks, bookId];
      }
    });
  };

  const handleDeleteSelected = () => {
    // Implement the logic for deleting selected books based on the selectedBooks state
    console.log('Selected Books:', selectedBooks);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Implement search functionality according to your requirements
    // You can filter and update the book list based on the search query
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h1>Books</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <button
            id="delete-selected-button"
            className="btn btn-danger btn-sm ml-2"
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </button>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <input
              type="text"
              id="search-bar"
              className="form-control search"
              placeholder="Search by book title"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                id="select-all-checkbox"
                className="checkbox"
                onChange={() => {
                  // Handle select all logic
                  // Update the selectedBooks state accordingly
                  console.log('Select All');
                }}
              />
            </th>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="book-table-body">
          {/* Map over your book data and render the rows */}
        </tbody>
      </table>
    </div>
  );
}

export default SellerBookList;
