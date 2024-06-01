const express = require('express');
const wrapAsync = require('../utils/wrapAsync.js');
const router = express.Router({mergeParams: true});
const {isLoggedIn, validateListing, isOwner} = require("../middlewares.js");
const listingController = require("../controllers/listing.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get(wrapAsync(listingController.index)) //index page
.post(isLoggedIn, upload.single('Listing[image]'), validateListing, wrapAsync(listingController.newListing)); // Add Listing


//Create New Listing
router.get("/new", isLoggedIn, listingController.newListingForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing)) //Show Route 
.put(isLoggedIn, isOwner, upload.single('Listing[image]'), validateListing, wrapAsync(listingController.updateListing)) //Update Route
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destoryListing)); //Delete Route

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing))

module.exports = router;