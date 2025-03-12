const Joi = require("joi");
const comment = require("./models/review.js");

const listingsSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().allow("", null),
    geometry: Joi.object({
        type: Joi.string().valid('Point').required(),
        coordinates: Joi.array()
            .items(Joi.number()) // Must be an array of numbers
            .length(2) // Exactly two numbers: [longitude, latitude]
            .required()
    }).required()
});

module.exports = { listingsSchema };

module.exports.reviewsSchema = Joi.object({
    comment : Joi.string().required(),
    rating : Joi.number().min(1).max(5).required()
})