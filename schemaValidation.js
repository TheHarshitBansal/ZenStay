const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    Listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow("", null),
        price: Joi.number().min(1).required(), 
        location: Joi.string().required(),
        country: Joi.string().required(),
        filters: Joi.array().items(Joi.string().valid(
            'Mountains', 'Amazing Pools', 'Castle', 'Amazing Cities', 'Arctic', 'Rooms', 'Beach', 'Camping', 'Apartment', 'Lake', 'Boats', 'Landmarks'
          ))
    }).required()
});

module.exports.reviewSchema = Joi.object({
    Review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required() 
    }).required()
});
