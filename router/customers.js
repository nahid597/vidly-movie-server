
const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug') ('app:customers');
const Joi = require('joi');


const route = express.Router();

const {Customer} = require('../model/customer');

route.get('/', async (req, res) => {
   const customer = await Customer.find();
   res.status(200).send(customer);
});

route.get('/:customerId', async (req, res) => {

    Customer.findById(req.params.customerId)
    .then(result => res.status(200).send(result))
    .catch(error => res.status(200).send('Requested id is not exists..'))
    ;
 });

route.post('/', async (req, res) => {
   // const customer = await Customer.find();
  const result =  inputValidated(req.body);
  
  if(result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
   let customer =  new Customer ({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
   });

      customer = await customer.save();
     res.status(200).send(customer);
 });


 route.patch('/:customerId', async (req, res) => {
    // const customer = await Customer.find();

//    const result =  inputValidated(req.body);
   
//    if(result.error) {
//      res.status(400).send(result.error.details[0].message);
//      return;
//    }

    const customersOps = {};

    for(const ops of req.body)
    {
        customersOps[ops.customerName] = ops.value;
    }
    

    Customer.findByIdAndUpdate( req.params.customerId ,
    {$set: customersOps },{new: true} )
    .then(result => res.status(200).send(result))
    .catch(error => res.status(404).send("Requested id is not exists.."));
 
  });


  route.delete('/:customerId', async (req, res) => {
        Customer.findByIdAndRemove(req.params.customerId)
        .then(result => res.status(200).send(result))
        .catch(error => res.status(404).send("Requested id is not exists.."));
  });


 function inputValidated(customer) {

    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(11).required(),
        isGold: Joi.required(),
    };

    return Joi.validate(customer , schema);

 }




module.exports = route;