
require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('app:test');
const config = require('config');
const error = require('./middleware/error');
const winston = require('winston');
require('winston-mongodb');

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


winston.handleExceptions(new winston.transports.File ({filename: 'uncaughtException.log'}));

process.on("unhandledRejection" , (ex) => {
    throw ex;
    
});

winston.add(winston.transports.File , {filename: 'logfile.log'});
winston.add(winston.transports.MongoDB , {db: "mongodb://localhost/Vidly"});

if(!config.get('jwtPrivateKey')){
    debug('FATAL error. jwrPrivateKey is not set..');
    process.exit(1);
}

//const p =  Promise.reject(new Error('something error ocuur..'));
//p.then(resutl => console.log("done"));

//throw new Error('something error ocuur..');


app.use('/api/genres', router);
app.use('/api/customers' , customers);
app.use('/api/movies' , movies);
app.use('/api/rentals' , rental);
app.use('/api/users' , user);
app.use('/api/auth' , auth);

app.use(error);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on ${port}...`);
});