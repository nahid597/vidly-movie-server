
const router = require('../router/routes');
const customers = require('../router/customers');
const movies = require('../router/movies');
const rental = require('../router/rental');
const user = require('../router/user');
const auth = require('../router/auth');
const error = require('../middleware/error');
const express = require('express');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/genres', router);
    app.use('/api/customers' , customers);
    app.use('/api/movies' , movies);
    app.use('/api/rentals' , rental);
    app.use('/api/users' , user);
    app.use('/api/auth' , auth);
    app.use(error);

}