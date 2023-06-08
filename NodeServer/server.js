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
        fs.writeFile('SellerData.json', JSON.stringify(sellerData), (writeErr) => {
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
  
  
  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
