const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const findFreePort = require('find-free-port');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', indexRouter);

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
