const winston = require('winston');
const express = require('express');
const passport = require('passport');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();

app.use(passport.initialize());
require('./validation/passport')(passport);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;