const mongoose = require('mongoose');

const multer = require('multer');

const AVATAR_PATH = ('/uploads/Admin');

const path = require('path');

const AdminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    hobby :{
        type : Array,
        required : true
    },
    city:{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        required : true
    },
    token : {
        type : String
    },
    isLogin : {
        type : Boolean
    
    }
})

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname,'..',AVATAR_PATH))
    },
    filename : function(req,file,cb){
        cb(null, file.fieldname+"-"+Date.now())
    }
});

AdminSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
AdminSchema.statics.avatarPath = AVATAR_PATH;

const Admin = mongoose.model('admin',AdminSchema);

module.exports = Admin;