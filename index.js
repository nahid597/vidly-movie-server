
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('app:test');
const config = require('config');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/Vidly' , {useNewUrlParser: true})
.then(() => debug('mongodb connecting...') )
.catch(error => debug('mongodb is not connected..'));

const router = require('./router/routes');
const customers = require('./router/customers');
const movies = require('./router/movies');
const rental = require('./router/rental');
const user = require('./router/user');
const auth = require('./router/auth');


if(!config.get('jwtPrivateKey')){
    debug('FATAL error. jwrPrivateKey is not set..');
    process.exit(1);
}

app.use('/api/genres', router);
app.use('/api/customers' , customers);
app.use('/api/movies' , movies);
app.use('/api/rentals' , rental);
app.use('/api/users' , user);
app.use('/api/auth' , auth);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on ${port}...`);
});