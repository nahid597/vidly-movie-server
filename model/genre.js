
const mongoose = require('mongoose');


const genreSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 30,
        minlength: 3,
        required: true
    }
});

const Genre = mongoose.model('Genre', genreSchema);


module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;