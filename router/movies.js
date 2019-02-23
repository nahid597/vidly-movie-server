
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug') ('app:customers');
const Joi = require('joi');
const {Genre} = require('../model/genre')


const route = express.Router();

const {Movie, validMovie} = require('../model/movie');

route.get('/', async (req, res) => {
   const movie = await Movie.find();
   res.status(200).send(movie);
});

route.get('/:movieId', async (req, res) => {

    Movie.findById(req.params.movieId)
    .then(result => res.status(200).send(result))
    .catch(error => res.status(200).send('Requested id is not exists..'))
    ;
 });

route.post('/', async (req, res) => {
   // const Movie = await Movie.find();
  //const result =  validMovie(req.body);
  
//   if(result.error) {
//     res.status(400).send(result.error.details[0].message);
//     return;
//   }

  const genre = await Genre.findById(req.body.genreId);
  if(!genre) {
    res.status(404).send("Invalid genre..");
    return;
  }

   let movie =  new Movie ({
        
        title: req.body.title,
        genre :
        {
            _id: genre._id,
            name: genre.name,
        },
        
        numberInStok: req.body.numberInStok,
        dailyRentalRate: req.body.dailyRentalRate

   });

      movie = await movie.save();
     res.status(200).send(movie);
 });


 route.patch('/:movieId', async (req, res) => {
    // const Movie = await Movie.find();

//    const result =  inputValidated(req.body);
   
//    if(result.error) {
//      res.status(400).send(result.error.details[0].message);
//      return;
//    }

    const moviesOps = {};

    for(const ops of req.body)
    {
        moviesOps[ops.movieName] = ops.value;
    }
    

    Movie.findByIdAndUpdate( req.params.movieId ,
    {$set: moviesOps },{new: true} )
    .then(result => res.status(200).send(result))
    .catch(error => res.status(404).send("Requested id is not exists.."));
 
  });


  route.delete('/:movieId', async (req, res) => {
        Movie.findByIdAndRemove(req.params.movieId)
        .then(result => res.status(200).send(result))
        .catch(error => res.status(404).send("Requested id is not exists.."));
  });


module.exports = route;