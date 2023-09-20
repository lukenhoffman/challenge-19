const express = require('express');
const path = require('path');
const cors = require('cors'); 
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_DIST_PATH = path.resolve(__dirname, '../client/dist');

// Logger (optional, but helpful)
app.use(morgan('dev'));

// Enable CORS (optional, based on your needs)
app.use(cors());

// Serve static files
app.use(express.static(CLIENT_DIST_PATH));

// Middleware for parsing requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
require('./routes/htmlRoutes')(app);

// Error handling middleware (always keep this after your routes)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
