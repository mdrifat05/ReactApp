import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const itemsPerPage = 2; // Number of items to display per page

function SellerBookList() {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBooks, setCurrentBooks] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(0);

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
      
      // Recalculate the new totalPageCount based on the remaining books
      const remainingBookCount = books.length - selectedBooks.length;
      const newTotalPageCount = Math.ceil(remainingBookCount / itemsPerPage);
      setTotalPageCount(newTotalPageCount);
    } catch (error) {
      console.error("Error deleting books:", error);
      setError("Failed to delete books. Please try again later.");
    }
  };
  

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1); // Reset current page when the search query changes
  };

  const navigate = useNavigate();
  const handleEditClick = (bookId) => {
    console.log("Edit clicked for book ID:", bookId);
    navigate(`/UpdateBook/${bookId}`);
  };

  const fetchBooks = async (page, searchQuery) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/books?sellerEmail=${localStorage.LoggedSellerEmail}&searchQuery=${searchQuery}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books.");
      }

      const responseData = await response.json();
      console.log("Data:", responseData);

      setBooks(responseData);
      console.log("Books:", books);

      const totalDataCount = responseData.length;


      const pageCount = Math.ceil(totalDataCount / itemsPerPage);
      setTotalPageCount(pageCount);

      console.log("Total page count:", totalPageCount);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to fetch books. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch the book data from the backend API
    fetchBooks(1, searchQuery);
  }, [currentPage, itemsPerPage, searchQuery]);

  useEffect(() => {
    // Calculate current books based on pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBooks = books.slice(startIndex, endIndex);
    console.log("Current books:", currentBooks);
    console.log("books:", books);
    setCurrentBooks(currentBooks);
  }, [books, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPageCount) {
      setCurrentPage(page);
      console.log("Current page:", page);
    }
  };

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
              placeholder="Search book "
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
                // checked={selectedBooks.length === books.length}
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
          {currentBooks.map((book) => (
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
      <Pagination
        currentPage={currentPage}
        totalPageCount={totalPageCount}
        itemsPerPage={itemsPerPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default SellerBookList;
