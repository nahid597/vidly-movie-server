

const express = require('express');
const {User, validatedUser} = require('../model/user');

const route = express.Router();

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

     user = new User({
         name: req.body.name,
         email:req.body.email,
         password: req.body.password 
     });

     await user.save();

     res.status(200).send(user);

});

module.exports = route;