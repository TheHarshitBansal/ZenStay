const mongoose = require('mongoose');
const Review = require("./review.js");
const { required } = require('joi');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        url: String,
        filename: String
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    reviews: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Review",
    }],
    owner:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required:true,
    },
    geometry:{
            type: {
              type: String, 
              enum: ['Point'],
            //   required: true
            },
            coordinates: {
              type: [Number],
            //   required: true
            }
    },
    filters:{
        type:[String],
        enum: ["All", "Mountains", 'Amazing Pools', 'Castle', 'Amazing Cities', 'Arctic', 'Rooms', 'Beach', 'Camping', 'Apartment', 'Lake', 'Boats', 'Landmarks']
    }
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    await Review.deleteMany({_id : {$in: listing.reviews}});
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
