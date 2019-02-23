

const mongoose = require('mongoose');
const {customerSchema} = require('./customer')
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const rentalSchema = mongoose.Schema({

    customer: {
        type: customerSchema,
        required: true,
    },

    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255,
            },

            dailyRentalRate: {
                type: Number,
                required: true,
                min:0,
                max: 255
            }
        }),
        required: true,
    },

    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturn: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min:0 
    }
    

});

function rentalValidate(rental) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    }

    return Joi.validate(rental, schema);
}

const Rental = mongoose.model('Rental', rentalSchema);

module.exports.Rental = Rental;
module.exports.rentalValidate = rentalValidate;