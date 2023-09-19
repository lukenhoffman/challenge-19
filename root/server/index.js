const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static assets from the client's dist directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Define any other routes or API endpoints here
// For example: app.get('/api/someEndpoint', (req, res) => { ... });

// Serve the bundled client app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
