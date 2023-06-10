const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;

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

  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
