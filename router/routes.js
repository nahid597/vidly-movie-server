
const express = require('express');
const Joi = require('joi');
const debug = require('debug')('app:test');
const mongoose = require('mongoose');

const route = express.Router();

const {Genre} = require('../model/genre');

route.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.send(genres);

});

route.get('/:id', async (req, res) => {
     Genre.findById(req.params.id)
    .then(result => res.send(result))
    .catch(error => res.send("Requested Id is not exists...") );
});

route.post('/', async (req, res) => {

    const result = validationInput(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    let genre = new Genre({
        name: req.body.name,
    });

    genre = await genre.save();
    //  const genre = req.body;
    res.send(genre);

});

route.put('/:id', async (req, res) => {

    const result = validationInput(req.body);
    if (result.error) {
        res.status(200).send(result.error.details[0].message);
        return;
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    .then(result => res.send(result))
    .catch(error =>  res.send("Requested Id is not exists..."));
});


route.delete('/:id', async (req, res) => {

    await Genre.findByIdAndRemove(req.params.id)
    .then(result => res.send(result))
    .catch(error =>  res.send("Requested Id is not exists..."));

});

function validationInput(genre) {
    const schema = {
        name: Joi.string().min(3).required(),
    }

    return Joi.validate(genre, schema);
}

module.exports = route;