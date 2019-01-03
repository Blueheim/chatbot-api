const winston = require('winston');
const express = require('express');
const cors = require('cors');
const config = require('config');
const app = express();

app.use(cors({
  origin: config.get('clientUrl')
}));

require('./init/logging')();
require('./init/routes')(app);
require('./init/prod')(app);

// PORT
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  winston.info(`Listening on port ${port}...`);
});

module.exports = server;