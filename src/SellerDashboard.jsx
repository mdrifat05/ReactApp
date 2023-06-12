import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';


function SellerBookList() {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCheckboxChange = (bookId) => {
    if (bookId === "all") {
      if (selectedBooks.length === books.length) {
        setSelectedBooks([]);
      } else {
        const allBookIds = books.map((book) => book.id);
        setSelectedBooks(allBookIds);
      }
    } else {
      setSelectedBooks((prevSelectedBooks) => {
        if (prevSelectedBooks.includes(bookId)) {
          return prevSelectedBooks.filter((id) => id !== bookId);
        } else {
          return [...prevSelectedBooks, bookId];
        }
      });
    }
  };

  const handleDeleteSelected = async () => {
    try {
      // Send a DELETE request to the backend API with the selected book IDs
      const response = await fetch("http://localhost:3000/api/books/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookIds: selectedBooks }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete books.");
      }
  
      // Update the books state by filtering out the deleted books
      setBooks((prevBooks) =>
        prevBooks.filter((book) => !selectedBooks.includes(book.id))
      );
  
      // Clear the selectedBooks state
      setSelectedBooks([]);
    } catch (error) {
      console.error("Error deleting books:", error);
      setError("Failed to delete books. Please try again later.");
    }
  };
  

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const navigate = useNavigate();
  const handleEditClick = (bookId) => {
    console.log("Edit clicked for book ID:", bookId);
    navigate(`/UpdateBook/${bookId}`);
  };
  

  useEffect(() => {
    // Fetch the book data from the backend API
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/books?sellerEmail=${localStorage.LoggedSellerEmail}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books.");
        }

        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to fetch books. Please try again later.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="Delete">
        <h1 className="header-margin">Book List</h1>
      </div>
      <div className=".container Search">
        <div className="row">
          <div className="col-md-7">
            <button
              id="delete-selected-button"
              className="btn btn-danger btn-sm ml-2"
              onClick={handleDeleteSelected}
            >
              Delete Selected
            </button>
          </div>
          <div className="col-md-5">
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
        <div className="form-group mt-3"></div>
      </div>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                id="select-all-checkbox"
                className="checkbox"
                checked={selectedBooks.length === books.length}
                onChange={() => handleCheckboxChange("all")}
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
          {books.map((book) => (
            <tr key={book.id}>
              <td>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedBooks.includes(book.id)}
                  onChange={() => handleCheckboxChange(book.id)}
                />
              </td>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.description}</td>
              <td>{book.price}</td>
              <td>{book.quantity}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEditClick(book.id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SellerBookList;
