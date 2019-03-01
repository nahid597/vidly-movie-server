
const  express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const {User} = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('config');


const route = express.Router();


route.post('/', async (req, res) => {
   const {error} = authValidated(req.body);

   if(error) return res.status(500).send(error.details[0].message);

   const user = await User.findOne({email: req.body.email});

   if(!user) return res.status(400).send("Invalid email or password..");

   const validEmail = await bcrypt.compare(req.body.password , user.password)
    if(!validEmail) return res.status(400).send("Invalid email or password..");

   //const token = jwt.sign({_id: user._id} , config.get('jwtPrivateKey'));
   const token = user.generateAuthToken();
    res.send(token);

});

function authValidated(auth) {
   const schema = {
        email: Joi.string().required().min(3).max(255).email(),
        password: Joi.string().required().min(6).max(255),
    }

    return Joi.validate(auth, schema);
}

module.exports = route;