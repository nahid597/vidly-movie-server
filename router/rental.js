

const express = require('express');
const mongoose = require('mongoose');

const route = express.Router();

const {Rental, rentalValidate} = require('../model/rental');
const {Customer} = require('../model/customer');
const {Movie} = require('../model/movie');
const Fawn = require('fawn');

Fawn.init(mongoose);


route.get('/', async (req, res) => {
   const rental = await Rental.find().sort('-dateOut');
   res.status(200).send(rental);
});

route.get('/:rentalId', async(req, res) => {
   
    const rental = await Rental.findById(req.params.rentalId);
    if(!rental) return res.status(404).send("Requested Id is not exists..");
    res.status(200).send(rental);
});


route.post('/', async(req, res) => {
   
    const result = rentalValidate(req.body);
    if(result.error) {
        res.status(404).send(result.error.details[0].message);
        return
    }

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send("customerId Invalid..");

    const movie = await Movie.findById(req.body.movieId);

    if(!movie) return res.status(404).send("movieId Invalid..");

    let rental = new Rental({

        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        }
    });


    try {

        Fawn.Task()
        .save('rentals' , rental)
        .update('movies' , {_id: movie._id} ,
        {$inc: {numberInStok: -1}}
        )
        .run();

        res.status(200).send(rental);
    }
    catch(ex) {
        res.status(500).send("something wrong..");
    }

    
 });


 route.patch('/:rentalId' , async (req, res) => {

    const rentalOps = {};
    for(let ops of req.body)
    {
        rentalOps[ops.rentalName] = ops.value;
    }
     Rental.findByIdAndUpdate(req.params.rentalId , {$set:rentalOps}, {new: true} )
     .then(result => res.status(200).send(result))
     .catch(eroor => res.status(404).save(error));

 });

 route.delete('/:rentalId', (req, res) => {

    Rental.findByIdAndRemove(req.params.rentalId)
    .then(result => res.status(200).send(result))
    .catch(eroor => res.status(404).save(error));
    
 });

 module.exports = route;

