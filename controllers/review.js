const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.addReview = async(req,res,next)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.Review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
  
    await newReview.save();
    await listing.save();
    req.flash("success", "Review added successfully");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destoryReview = async(req,res,next)=>{
    let {id, reviewId} = req.params;
  
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully");
    res.redirect(`/listings/${id}`);
  }