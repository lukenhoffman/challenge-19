const path = require('path');
const express = require('express');

module.exports = (app) => {
  // Serve the main page
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'), (err) => {
      if (err) {
        res.status(500).send('Server Error');
      }
    });
  });

  // Example for serving another page, e.g., about.html
  // app.get('/about', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../client/about.html'), (err) => {
  //     if (err) {
  //       res.status(500).send('Server Error');
  //     }
  //   });
  // });

  // Handle 404 - Put this always last
  app.use('*', (req, res) => {
    res.status(404).send('Page not found');
  });
};
