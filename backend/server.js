const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const filePath = path.join(__dirname, 'celebrities.json');

app.get('/api/celebrities', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post('/api/celebrities', (req, res) => {
  const updatedData = req.body;

  fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (err) => {
    if (err) {
      res.status(500).send('Error writing data');
    } else {
      res.send('Data saved successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});