const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const config = require('./config/config');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Use routes
app.use('/api', routes);

module.exports = app;