const express = require('express');
const passport = require('passport');

const route = express.Router();

const Admin = require('../models/Admin');

const AdminController = require('../controllers/adminController');

//session routingr
route.post('/createSession',passport.authenticate('local',{failureRedirect : '/login'}),AdminController.dashboardSession);
//login routing

route.get('/login', AdminController.login);

route.post('/checkLogin', AdminController.checkLogin);


route.get('/logout', function(req,res,next){
    req.logout(function(err){
        if(err){
            console.log("somethign wrong");
        }
        return res.redirect('/login');
    })
})

//
//Registration routing

route.get('/register',AdminController.Register);

route.post('/add_register', AdminController.AddRegister);

//

//dashboard page load
route.get('/',passport.checkAuthentication,AdminController.dashboard);
//

//Crud operation for admin
route.get('/add_admin',passport.checkAuthentication,AdminController.addAdmin);

route.get('/view_admin', passport.checkAuthentication,AdminController.viewAdmin);

route.post('/insertAdminRecord',passport.checkAuthentication,Admin.uploadedAvatar,AdminController.insertAdminRecord);

route.get('/deleteAdmin/:id', passport.checkAuthentication,AdminController.deleteAdmin);
//

route.get('/changePass',passport.checkAuthentication, AdminController.changePass);

route.post('/EditPassword', passport.checkAuthentication, AdminController.EditPassword)

route.get('/lostPass', function(req,res){
    return res.render('Lostpass');
})


route.post('/checkEmail', AdminController.checkEmail);

route.get('/checkOtp', AdminController.checkOtp);

route.post('/verifyOTP', AdminController.verifyOTP);

route.get('/generateNewpass', AdminController.generateNewpass);

route.post('/resetpassword', AdminController.resetPassword);

route.use('/category',require('./category'));
route.use('/subcategory', require('./subcategory'));
route.use('/extracategory', require('./extracategory'));
route.use('/api', require('./API/user_api'));

module.exports = route;