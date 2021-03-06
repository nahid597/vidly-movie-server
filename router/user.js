
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const express = require('express');
const {User, validatedUser} = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const route = express.Router();

route.get('/me' , auth , async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

route.post('/' , async (req, res) => {
  
    const result = validatedUser(req.body);
    if(result.error) {
        res.status(404).send(result.error.details[0].message);
        return
    }

   let user = await User.findOne({email: req.body.email});
     if(user) {
         res.status(400).send("User  already Registered..");
         return;
     }


     user = new User(_.pick(req.body, ['name' , 'email' , 'password']));

     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(user.password , salt);



     /*user = new User({
         name: req.body.name,
         email:req.body.email,
         password: req.body.password 
     });*/

     //bcrypt.genSalt(10);

     await user.save();

    // const token =  jwt.sign({_id:user._id} , config.get('jwtPrivateKey') );
     
    const token = user.generateAuthToken();
     res.header('x-auth-token' , token).send(_.pick(user, [ '_id' , 'name' , 'email']));

    // res.status(200).send(user);

});

module.exports = route;