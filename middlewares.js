const expressError = require('./utils/expressError.js');
const {listingSchema, reviewSchema} = require("./schemaValidation.js");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in");
        res.redirect("/login");
    }
    next();
} 

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
      const msg = error.details.map(el => el.message).join(', ');
      throw new expressError(400, msg);
    } else {
      next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      const msg = error.details.map(el => el.message).join(', ');
      throw new expressError(400, msg);
    } else {
      next();
    }
}

module.exports.isOwner = async (req, res, next) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  if(!res.locals.currUser || !(listing.owner._id.equals(res.locals.currUser._id))){
    req.flash("error", "Access Denied");
    res.redirect(`/listings/${id}`)
  } 
  next();
}

module.exports.checkRating = (req,res,next) => {
  let newReview = new Review(req.body.Review);
  if(newReview.rating == 0){
        req.flash("error","Rating must be between 1 and 5 stars");
        res.redirect(`/listings/${listing._id}`)
    }
  next();
}