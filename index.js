
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('app:test');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/Vidly' , {useNewUrlParser: true})
.then(() => debug('mongodb connecting...') )
.catch(error => debug('mongodb is not connected..'));

const router = require('./router/routes');
const customers = require('./router/customers');
const movies = require('./router/movies');


app.use('/api/genres', router);
app.use('/api/customers' , customers);
app.use('/api/movies' , movies);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on ${port}...`);
});