const app = require('./app');
const config = require('./config/config');

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Kindness Quest API running on port ${PORT} in ${config.environment} mode`);
});