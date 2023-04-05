const exp = require('constants');
const express = require('express');
const cookieParser = require('cookie-parser');

const port = 8001;

const app = express();

const path = require('path');

const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');

const flash = require('connect-flash');
const customM = require('./config/middleware');
const cors = require('cors');



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(cookieParser());

app.use(express.static('assets'));

app.use(express.urlencoded());

app.use('/uploads', express.static(path.join(__dirname+'/uploads')));

app.use(session({
    name : "Harsh",
    secret : "RNW",
    saveUninitialized : false,
    resave : true,
    cookie : {
        maxAge : 1000*100*60
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customM.setFlash);

app.use(cors({
    origin: '*'
}));


app.use('/',require('./routes'));




app.listen(port, function(err){
    if(err){
        console.log("somethign wrong");
    }
    console.log("server is running on port:",port);
})