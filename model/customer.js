const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    phone: {
        type: String,
        required: true
    },
    isGold: Boolean,

});

const Customer = mongoose.model('Customer' , customerSchema);

module.exports.customerSchema = customerSchema;
module.exports.Customer = Customer;