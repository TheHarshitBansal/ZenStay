const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req,res, next)=>{
    const allListings = await Listing.find({}).populate("image");
    res.render("listing/index.ejs", { allListings });
}

module.exports.newListingForm = (req,res)=>{
    res.render("listing/create.ejs")
}

module.exports.newListing = async(req,res,next)=>{
    const url = req.file.path;
    const filename = req.file.filename;
    const newListing = new Listing(req.body.Listing);
    const response = await geocodingClient.forwardGeocode({
      query: newListing.location + ", " + newListing.country,
      limit: 1
    })
      .send()
    newListing.geometry = (response.body.features[0].geometry);
    newListing.image = {url,filename};
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Listing created successfully");
    res.redirect("/listings");
}

module.exports.showListing = async (req,res, next)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id).populate("owner").populate({path:"reviews", populate:{
      path:"author"}
    }).populate("image");
    if(!listing){
      req.flash("error", "Listing does not exists");
      res.redirect("/listings");
    }
    res.render("listing/show.ejs", {listing});
}

module.exports.editListing = async(req,res,next)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "Listing does not exists");
      res.redirect("/listings");
    }
    res.render("listing/edit.ejs", {listing});
}

module.exports.updateListing = async(req,res,next)=>{
    const {id} = req.params;
    const response = await geocodingClient.forwardGeocode({
      query: req.body.Listing.location + ", " + req.body.Listing.country,
      limit: 1
    })
      .send()
    req.body.Listing.geometry = (response.body.features[0].geometry);
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.Listing});

    if(typeof req.file !== "undefined"){
      
      const url = req.file.path;
      const filename = req.file.filename;
      listing.image = {url,filename};
      await listing.save();
    }
    req.flash("success", "Listing edited successfully");
    res.redirect(`/listings/${id}`);
}

module.exports.destoryListing = async(req,res,next)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully");
    res.redirect("/listings");
  }