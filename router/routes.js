
const express = require('express');
const Joi = require('joi');
const debug = require('debug')('app:test')

const route = express.Router();

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Drama' },
]

route.get('/', (req, res) => {
    res.send(genres);

});

route.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        res.send("Requested Id is not exists...");
        return;
    
    }
    res.send(genre);

});

route.post('/', (req, res) => {

    const result = validationInput(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name,
    }

    genres.push(genre);
    //  const genre = req.body;
    res.send(genre);

});

route.put('/:id', (req, res) => {

    const genre = genres.find(c => c.id === parseInt(req.params.id));

    if (!genre) {
        res.send("Requested Id is not exists...");
        return;
    }

    genre.name = req.body.name;

    res.send(genre);

});


route.delete('/:id', (req, res) => {

    const genre = genres.find(c => c.id === parseInt(req.params.id));

    if (!genre) {
        res.send("Requested Id is not exists...");
        return;
    }
    const index = req.params.id;

    const deleteGenre = genres.indexOf(index);

    genres.splice(deleteGenre, 1);

    res.send(genre);

});

function validationInput(genre) {
    const schema = {
        name: Joi.string().min(3).required(),
    }

    return Joi.validate(genre, schema);
}

module.exports = route;