const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const moongoose = require('mongoose');
const express = require('express');
const application = express();
const {Schema} = moongoose;
application.use(bodyParser.json());

const userSchema = new Schema({
    name: String,
    surname: String,
    birthday: {type: Date, default: Date.now},
    studentNumber: Number,
    phoneNumber: Number,
    email: String,
    address: String,
    interests: [{type: moongoose.Schema.Types.ObjectId, ref: 'Interest'}],
    password: String
});

function validateRegister(user){
    const schema = new Joi.object({
        name: Joi.string().min(3).required(),
        surname: Joi.string().min(3).required(),
        birthday: Joi.date().required(),
        studentNumber: Joi.number().min(11).max(11).required(),
        phoneNumber: Joi.number().min(10).max(10).required(),
        email: Joi.string().email().required(),
        address: Joi.string().min(10).required(),
        interests: Joi.array().required(),
        password: Joi.string().min(6).max(6).required()
    });

    return schema.validate(user);
}

function validateLogin(user){
    const schema = new Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(user);
}

userSchema.methods.generateToken = function(){
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
};

const User = moongoose.model('User', userSchema);

module.exports = {User, validateRegister, validateLogin};