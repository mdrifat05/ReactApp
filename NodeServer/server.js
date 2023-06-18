const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);
app.use(cors()); // Use the cors middleware

app.use(express.json());

app.post('/api/saveSellerData', (req, res) => {
    const formData = req.body;
  
    // Read existing data from the file
    fs.readFile('RegistrationData.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading data:', err);
        res.status(500).json({ error: 'Error reading data' });
      } else {
        let sellerData = [];
  
        try {
          // Parse the existing data as JSON
          sellerData = JSON.parse(data);
        } catch (parseError) {
          console.error('Error parsing data:', parseError);
          res.status(500).json({ error: 'Error parsing data' });
          return;
        }
        // Add the new form data to the existing array
        sellerData.push(formData);
  
        // Save the updated data to the file
        fs.writeFile('RegistrationData.json', JSON.stringify(sellerData), (writeErr) => {
          if (writeErr) {
            console.error('Error saving data:', writeErr);
            res.status(500).json({ error: 'Error saving data' });
          } else {
            console.log('Data appended to SellerData.json');
            res.json({ message: 'Data saved successfully' });
          }
        });
      }
    });
  });
  
  // Endpoint for login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Read the registration data from the JSON file
  fs.readFile('RegistrationData.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading registration data:', err);
      return res.status(500).json({ error: 'An error occurred' });
    }

    try {
      const registrationData = JSON.parse(data);
      const user = registrationData.find((user) => user.email == email && user.password == password);
      if (user) {
        // User found, return the user's role
        res.json({ role: user.role });
      } else {
        // User not found or invalid credentials
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error parsing registration data:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
});

// Endpoint for insering the book data
app.post('/api/addBook', (req, res) => {
  const bookData = req.body;

  // Read existing data from the file
  fs.readFile('BookData.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
      res.status(500).json({ error: 'Error reading data' });
    } else {
      let bookList = [];

      try {
        // Parse the existing data as JSON
        bookList = JSON.parse(data);
      } catch (parseError) {
        console.error('Error parsing data:', parseError);
        res.status(500).json({ error: 'Error parsing data' });
        return;
      }

      // Add the new book data to the existing array
      bookList.push(bookData);

      // Save the updated data to the file
      fs.writeFile('BookData.json', JSON.stringify(bookList), (writeErr) => {
        if (writeErr) {
          console.error('Error saving data:', writeErr);
          res.status(500).json({ error: 'Error saving data' });
        } else {
          console.log('Data appended to BookData.json');
          res.json({ message: 'Book data saved successfully' });
        }
      });
    }
  });
});



app.get("/api/books", async (req, res) => {
  try {
    const data = await readFileAsync("BookData.json", "utf8");
    const books = JSON.parse(data);
    const loggedSellerEmail = req.query.sellerEmail;
    const filteredBooks = books.filter(
      (book) => book.sellerEmail === loggedSellerEmail
    );
    res.json(filteredBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read book data." });
  }
});

// app.get("/api/books", async (req, res) => {
//   try {
//     const data = await readFileAsync("BookData.json", "utf8");
//     const books = JSON.parse(data);
//     const loggedSellerEmail = req.query.sellerEmail;
//     const filteredBooks = books.filter(
//       (book) => book.sellerEmail === loggedSellerEmail
//     );

//     // Get the query parameters for pagination
//     let { page, limit } = req.query;

//     // Convert the page and limit parameters to numbers (default to 1 and 5 if not provided)
//     page = parseInt(page) || 1;
//     limit = parseInt(limit) || 5;

//     // Print a message if page 2 is requested
//     if (page === 2) {
//       console.log("Page 2 was requested!");
//     }

//     // Calculate the startIndex and endIndex based on the page and limit values
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     // Slice the filtered books based on the pagination parameters
//     const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

//     // Calculate the total data count
//     const totalDataCount = filteredBooks.length;

//     res.json({
//       totalDataCount,
//       data: paginatedBooks,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to read book data." });
//   }
// });




app.delete('/api/books/delete', (req, res) => {
  const { bookIds } = req.body;

  // Read existing data from the file
  fs.readFile('BookData.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
      res.status(500).json({ error: 'Error reading data' });
    } else {
      let bookList = [];

      try {
        // Parse the existing data as JSON
        bookList = JSON.parse(data);
      } catch (parseError) {
        console.error('Error parsing data:', parseError);
        res.status(500).json({ error: 'Error parsing data' });
        return;
      }

      // Remove the selected books from the bookList array
      bookList = bookList.filter((book) => !bookIds.includes(book.id));

      // Save the updated data to the file
      fs.writeFile('BookData.json', JSON.stringify(bookList), (writeErr) => {
        if (writeErr) {
          console.error('Error saving data:', writeErr);
          res.status(500).json({ error: 'Error saving data' });
        } else {
          console.log('Books deleted from BookData.json');
          res.json({ message: 'Books deleted successfully' });
        }
      });
    }
  });
});

// GET /api/books/:bookId
app.get('/api/books/:bookId', (req, res) => {
  const { bookId } = req.params;
  const bookData = JSON.parse(fs.readFileSync('BookData.json'));

  const book = bookData.find((book) => book.id == parseInt(bookId));

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// POST /api/update/:bookId
app.post('/api/update/:bookId', (req, res) => {
  const { bookId } = req.params;
  const updatedBookData = req.body;

  // Read the book data from BookData.json
  const bookData = JSON.parse(fs.readFileSync('BookData.json'));

  // Find the book to be updated
  const bookIndex = bookData.findIndex((book) => book.id == parseInt(bookId));

  if (bookIndex !== -1) {
    // Update the book data
    bookData[bookIndex] = {
      ...bookData[bookIndex],
      ...updatedBookData
    };

    // Save the updated book data back to BookData.json
    fs.writeFileSync('BookData.json', JSON.stringify(bookData, null, 2));

    res.json({ message: 'Book updated successfully' });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

app.get('/api/GetSellerProfile', (req, res) => {
  // Read the loggedSellerEmail from the request headers
  const loggedSellerEmail = req.headers['loggedselleremail'];

  // Read the JSON file data
  fs.readFile('RegistrationData.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Parse the JSON data
    const profiles = JSON.parse(data);

    // Find the profile based on the loggedSellerEmail
    const profile = profiles.find((p) => p.email === loggedSellerEmail);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    return res.json(profile);
  });
});

  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
