const express = require('express');
const path = require('path');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const flightsRouter = require('./routes/flights');
const findFreePort = require('find-free-port');

const app = express();

// Require and configure dotenv to load environment variables from .env file
require('dotenv').config();

// Require the database connection
require('./config/database');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', indexRouter);
app.use('/flights', flightsRouter);

// Error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

// Find a free port and start the server
findFreePort(3000, function(err, port) {
  if (err) {
    console.error('Error finding free port:', err);
    return;
  }
  app.set('port', port);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

module.exports = app;
