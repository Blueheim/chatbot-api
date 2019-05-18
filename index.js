const winston = require('winston');
const express = require('express');
const cors = require('cors');
const config = require('config');
const app = express();

app.use(
  cors({
    origin: config.get('clientUrl'),
  })
);

if (process.env.NODE_ENV !== 'production') {
  require('./init/logging')();
}
require('./init/routes')(app);
require('./init/prod')(app);

// PORT
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = server;
