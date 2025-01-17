const Joi = require('joi');
const moongoose = require('mongoose');
const {Schema} = moongoose;

const interestSchema = new Schema({
    name: String
});

function validateInterest(interest){
    const schema = new Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(interest);
}

const Interest = moongoose.model('Interest', interestSchema);

module.exports = {Interest, validateInterest};