import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomerBookList() {
  // Replace this with your book data
  const bookData = [];

  return (
    <div className="container mt-4">
      <h1>Book List</h1>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Shop Name</th>
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
          {bookData.map((book, index) => (
            <tr key={index}>
              <td>{book.shopName}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.description}</td>
              <td>{book.price}</td>
              <td>{book.quantity}</td>
              <td>Action</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerBookList;
