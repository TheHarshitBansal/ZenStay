const express = require('express');
const wrapAsync = require('../utils/wrapAsync.js');
const router = express.Router({mergeParams:true});
const {isLoggedIn, validateReview, isOwner, checkRating} = require("../middlewares.js");
const reviewController = require("../controllers/review.js")

//Add Review Route
router.post("/", isLoggedIn, checkRating, validateReview, wrapAsync(reviewController.addReview));
  
// Delete Review Route
router.delete("/:reviewId", isLoggedIn, isOwner, wrapAsync(reviewController.destoryReview));

module.exports = router;
  