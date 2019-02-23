

const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const Joi = require('joi');


const movieSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },

    genre: {
        type: genreSchema,
        required: true,
    },

    numberInStok: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    },

    dailyRentalRate: {
        type: Number,
        required: true,
        min:0,
        max: 255
    }

});

function validMovie (movie) {
    const schema = {
        title: Joi.string().min(5).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(255),
        dailyRentalRate: Joi.number().min(0).max(255),
    }

    return Joi.validate(movie, schema);
}

const Movie = mongoose.model('Movie' , movieSchema);

module.exports.Movie = Movie;
module.exports.movieSchema = movieSchema;
module.exports.validMovie = validMovie;
