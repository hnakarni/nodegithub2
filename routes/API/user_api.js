const express = require('express');

const routes = express.Router();

const Admin = require('../../models/Admin');

const passport =require('passport');

const userapiController = require('../../controllers/ApiController/userController');

routes.get('/',passport.authenticate('jwt',{failureRedirect : 'wrongLogin'}) ,userapiController.userData);

routes.post('/insertApiRecord', passport.authenticate('jwt',{failureRedirect : 'wrongLogin'}), Admin.uploadedAvatar, userapiController.insertApiRecord);

routes.delete('/deleteApiRecord/:id', passport.authenticate('jwt',{failureRedirect : '/api/wrongLogin'}), userapiController.deleteApiRecord);

routes.patch('/updateApiRecord/:id',passport.authenticate('jwt',{failureRedirect : '/api/wrongLogin'}), Admin.uploadedAvatar, userapiController.updateApiRecord);

routes.post('/checkLogin', userapiController.checkLogin);

routes.get('/Apilogout/:id',passport.authenticate('jwt',{failureRedirect : '/api/wrongLogin'}),userapiController.apiLogout);

routes.get('/wrongLogin', function(req,res){
    return res.json({'status':400,'msg':"invalid Token"});
})


module.exports = routes;