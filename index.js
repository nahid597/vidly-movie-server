
const express = require('express');
const debug = require('debug')('app:test');

const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on ${port}...`);
});