const express = require('express');
const User = require("../models/user.js");
const passport = require('passport');
const { saveRedirectUrl } = require('../middlewares.js');
const router = express.Router({mergeParams:true});
const userController = require("../controllers/user.js");

router.route("/signup")
.get(userController.signUpForm)     //Signup Page
.post(userController.signUp);       //Add User

router.route("/login")
.get(userController.loginForm)      //Login Page
.post(saveRedirectUrl, passport.authenticate("local", {        //Authenticate User
    failureRedirect: "/login",
    failureFlash: true,
}), userController.login);

//Logout
router.get("/logout", userController.logout);
module.exports = router;