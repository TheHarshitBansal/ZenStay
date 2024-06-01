const User = require("../models/user.js");

module.exports.signUpForm = (req,res,next)=>{
    res.render("user/signup.ejs");
};

module.exports.signUp = async(req,res,next)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        await registeredUser.save();
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", `Hey ${username}, Welcome to ZenStay`);
            res.redirect("/listings")
        })
        
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.loginForm = (req,res,next)=>{
    res.render("user/login.ejs");
};

module.exports.login = async(req,res,next)=>{
    req.flash("success", "Welcome back to ZenStay!");
    const redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out");
        res.redirect("/listings");
    })
};