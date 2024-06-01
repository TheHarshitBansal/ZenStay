const mongoose = require('mongoose');
const initData = require("./data.js")
const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = "pk.eyJ1IjoidGhlaGFyc2hpdGJhbnNhbCIsImEiOiJjbHdydTMwdnowMDU5MmlzMmk2b3ExNHVtIn0.z0hZjLkcSJdcn4Y20PURPw";
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

urlDB = 'mongodb+srv://harshitbansal1201:bfAwccu52BGumxiL@cluster.1gnhjar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster'


main()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(urlDB);
}

async function updateCoordinates(){
  for (const obj of initData.data) {
    const response = await geocodingClient.forwardGeocode({
      query: obj.location + ", " + obj.country,
      limit: 1
    })
      .send()
    obj.geometry = (response.body.features[0].geometry);
    await Listing.insertMany(obj);
  }
}

async function init(){
    await Listing.deleteMany({});
    await updateCoordinates();
    console.log("Data Injected Successfully");
}

init();

// console.log(mapToken);
