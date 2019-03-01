

const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 30,
        minlength: 3,
        required: true
    },
    email: {
        type: String,
        maxlength: 30,
        minlength: 3,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        maxlength: 1024,
        minlength: 6,
        required: true
    },
    isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function() {
    const token =  jwt.sign({_id:this._id , isAdmin:this.isAdmin} , config.get('jwtPrivateKey') );
    return token;
}

function validatedUser(user)
{  
    const schema = {
        name: Joi.string().required().min(3).max(255),
        email: Joi.string().required().min(3).max(1024).email(),
        password: Joi.string().required().min(6).max(255),
    }
  return Joi.validate(user, schema);
}

const User = mongoose.model('User', userSchema);


module.exports.userSchema = userSchema;
module.exports.User = User;
module.exports.validatedUser = validatedUser;