
const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/Vidly', { useNewUrlParser: true })
        .then(() => winston.info('mongodb connecting...'))
}

