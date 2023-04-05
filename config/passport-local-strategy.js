const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const Admin = require('../models/Admin');

passport.use(new passportLocal({
    usernameField : 'email'
}, function(email,password,done){
    
    Admin.findOne({email : email}, function(err,user){
        if(err){
            console.log("something wrong");
            done(null,err);
        }
        if(!user || user.password != password){
            done(null,false)
        }
        
        done(null,user)
    })
}))

passport.serializeUser(function(user,done){
        done(null,user.id);
})

passport.deserializeUser(function(id,done){
    Admin.findById(id,function(err,user){
        if(err){
            done(null,err);
        }
        done(null,user);
    })
})

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/login');
}


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next();
}

module.exports = passport;