const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const moongoose = require('mongoose');
const express = require('express');
const application = express();
const {Schema} = moongoose;
application.use(bodyParser.json());

const clubSchema = new Schema({
    name: String,
    description: String,
    members: [{type: moongoose.Schema.Types.ObjectId, ref: 'User'}],
    events: [{type: moongoose.Schema.Types.ObjectId, ref: 'Event'}]
});

function validateClub(club){
    const schema = new Joi.object({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(10).required()
    });

    return schema.validate(club);
}

const Club = moongoose.model('Club', clubSchema);

module.exports = {Club, validateClub};