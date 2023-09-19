const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config(); // For environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use CORS middleware
app.use(cors());

// Serve static assets from the client's dist directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Define any other routes or API endpoints here
// For example: app.get('/api/someEndpoint', (req, res) => { ... });

// Serve the bundled client app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
