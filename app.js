if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const expressError = require('./utils/expressError.js');
const listingRoute = require("./routes/listings.js");
const userRoute = require("./routes/users.js");
const reviewRoute = require("./routes/reviews.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const User = require("./models/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { log } = require('console');

const port = 3000;

app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,'/public')));

urlDB = process.env.ATLAS_URL;

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

const store = MongoStore.create({
  mongoUrl: urlDB,
  touchAfter: 24 * 3600,
})

store.on("error", ()=>{
  console.log("Error in MONGO ATLAS", err);
})

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{
    httpOnly:true,
    expires: Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
  }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error")
  res.locals.currUser = req.user;
  next();
})

//Index Root Page
app.get("/", (req,res)=>{
  res.redirect("/listings")
})

//Listing Routes
app.use("/listings", listingRoute);

//Review Routes
app.use("/listings/:id/reviews", reviewRoute);

//User Routes
app.use("/", userRoute);

//Random Routes
app.all("*", (req,res)=>{
  throw new expressError(404, "Page Not Found");
})

app.use((err, req, res, next)=>{
  let {status=400, message="Something went wrong!"} = err;
  res.render("layouts/error.ejs", {status, message})
})

app.listen(port, ()=>{
    console.log("Server is listening to port 3000");
    
});