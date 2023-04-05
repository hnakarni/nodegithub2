const Admin = require('../models/Admin');
const fs = require("fs");
const path = require('path');
const nodemailer = require("nodemailer");

module.exports.dashboardSession = function(req,res){
    req.flash('success',"Login successfully");
    return res.redirect('/');
}

module.exports.dashboard = function(req,res){
   
    return res.render("dashboard");
}

module.exports.addAdmin = function(req,res){
    return res.render('Add_admin');
}

module.exports.viewAdmin = async (req,res) =>{
  
    // Admin.find({}, function(err, AdminRecord){
    //     if(err){
    //         console.log(err);
    //         return false;
    //     }
    //     return res.render('view_admin',{
    //         'adminRecord' : AdminRecord,
    //     });
    // })

    // Admin.find({}).then((resData)=>{
    //     return res.render('view_admin',{
    //         'adminRecord' : resData,
    //     });
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
    let search = '';

    if(req.query.search){
        search = req.query.search
    }

    var page = 1;
    if(req.query.page){
        page = req.query.page
    }

    var per_page = 4;

    let AdminData = await Admin.find({
        $or : [
            { name : { $regex : '.*'+search+'.*'}},
            { email : { $regex : '.*'+search+'.*'}}
        ]
    })
    .skip((page - 1)*per_page)
    .limit(per_page)
    .exec();

    let CountData = await Admin.find({
        $or : [
            { name : { $regex : '.*'+search+'.*'}},
            { email : { $regex : '.*'+search+'.*'}}
        ]
    }).countDocuments();
    
    return res.render('view_admin',{
        'adminRecord' : AdminData,
        'countRecord' : Math.ceil(CountData/per_page),
        'searchData' : search,
        "currentPage" : page,
        "next" : page+1,
        "prev" : page-1
    });

    
}

module.exports.insertAdminRecord = async (req,res)=>{
     

      
            // var imgPath = '';
            // if(req.file){
            //     imgPath = Admin.avatarPath+"/"+req.file.filename;
            // }
            // req.body.name = req.body.fname+" "+req.body.lname;
            // req.body.avatar= imgPath;
            // Admin.create(req.body).then((resData)=>{
            //     req.flash('success','Record inserted successfully');
            //     return res.redirect('back');
            // }).catch((err)=>{
            //     console.log("record not inserted")
            // })

            var imgPath = '';
            if(req.file){
                imgPath = Admin.avatarPath+"/"+req.file.filename;
            }
            req.body.name = req.body.fname+" "+req.body.lname;
            req.body.avatar= imgPath;
            let adminData = await Admin.create(req.body);
            if(adminData){
                req.flash('success','Record inserted successfully');
                return res.redirect('back');
            }
            else{
                console.log("record not inserted")
            }
             
           
       


}


module.exports.deleteAdmin = function(req,res){
    Admin.findById(req.params.id, function(err,adminRecord){
        if(err){
            console.log("record not found");
            return false;
        }
        if(adminRecord.avatar){
            fs.unlinkSync(path.join(__dirname,'..',adminRecord.avatar));
            Admin.findByIdAndDelete(req.params.id, function(err,deleteRecord){
                if(err){
                    console.log("record not deleted");
                    return false;
                }
                return res.redirect('/view_admin')
            })
        }
        else{
            
            return res.redirect('/view_admin');
        }
    })
}


module.exports.Register = function(req,res){
    if(req.isAuthenticated()){
        
        return res.redirect('/');
    }
    return res.render('Registration');
}

module.exports.AddRegister = function(req,res){
    Admin.findOne({email : req.body.email}, function(err,AdminRecord){
        if(err){
            console.log("something wrong");
            return false;
        }

        if(AdminRecord){
            console.log("You are already register try new email id!!");
            return false;
        }
        else{
            if(req.body.password == req.body.cpassword){
                Admin.create({
                    name : req.body.name,
                    email :req.body.email,
                    password : req.body.password,
                    gender : "null",
                    hobby : [],
                    city : "null",
                    description : "null",
                    avatar : "null"
                }, function(err,InsertRecord){
                    if(err){
                        console.log("data not inserted ");
                        return false;
                    }

                    return res.redirect('back');
                })
            }else{
                console.log("Password and confirm password not match");
                return false;
            }
        }
    })
}

module.exports.login = function(req,res){
    
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('login');
}

module.exports.checkLogin = function(req,res){
    Admin.findOne({email : req.body.email}, function(err,AdminRecord){
        if(err){
            console.log("something wrong");
            return res.redirect('back');
        }

        if(AdminRecord){
            if(AdminRecord.password == req.body.password){
                res.cookie('adminId',AdminRecord.id);
                res.cookie('record',AdminRecord);
                return res.redirect('/');
            }
            else{
                console.log("Invalid password");
                return res.redirect('back');
            }
        }
        else{
            console.log("Invalid email");
            return res.redirect('back');
        }
    })
}


module.exports.changePass = function(req,res){
    return res.render('changePassword');
}

module.exports.EditPassword = function(req,res){
  
    var oldpass = req.user.password;
    var cpass = req.body.cpass;
    var npass = req.body.npass;
    var copass = req.body.copass;
    if(oldpass ==cpass){
        if(cpass != npass)
        {
            if(npass == copass){
                Admin.findByIdAndUpdate(req.user.id,{
                    password : npass
                },function(err,passUpdated){
                    if(err){
                        console.log("somethign wrong");
                        return res.redirect('back');
                    }
                    return res.redirect('/logout')
                })
            }
            else{
                console.log("new & confirm  password not match");
                return res.redirect('back');
            }
        }
        else{
            console.log("current or new password are match");
            return res.redirect('back');
        }
    }
    else{
        console.log("current password not match");
        return res.redirect('back');
    }
}

//for lost password all function

module.exports.checkEmail = function(req,res){
    // console.log(req.body.email)

    Admin.findOne({email:req.body.email}, function(err,userData){
        if(err){
            req.flash('error','Something wrong');
            return res.redirect('/lostPass');
        }
        if(userData){
            var otp  = Math.ceil(Math.random()*10000);
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "c28fb7658b2081",
                  pass: "e5caf9f7456cf9"
                }
              });

              let info =  transport.sendMail({
                from: 'rwn2developerfaculty@gmail.com', // sender address
                to: userData.email, // list of receivers
                subject: "Testing in node js Email", // Subject line
                text: "First Line of Check OTP", // plain text body
                html: `<b>Here is your OTP :${otp}</b>`, // html body
              });

              res.cookie('otp',JSON.stringify([otp,req.body.email]));
              res.cookie('email',req.body.email);

             return res.redirect('/checkOtp');
                

        }
        else{
            req.flash("error","record not found");
            return res.redirect('/lostPass');
        }
    })
}


module.exports.checkOtp = (req,res)=>{
    return res.render('checkotp');
}

module.exports.verifyOTP = (req,res)=>{
    const data = JSON.parse(req.cookies.otp);
    console.log(data[0])
    console.log(req.body.otp);
    if(data[0] == req.body.otp)
    {
        return res.redirect('/generateNewpass');
    }
    else{
        req.flash('error','OTP not Match');
        return res.redirect('/checkOtp')
    }
}

module.exports.generateNewpass = (req,res) =>{
    return res.render('generatePass');
}

module.exports.resetPassword = (req,res)=>{
    if(req.body.npass == req.body.cpass){
        Admin.findOne({email : req.cookies.email}, function(err,userData){
            if(err){
                req.flash('error','Something wrong');
                return res.redirect('/generateNewpass') 
            }
            if(userData){
                Admin.findByIdAndUpdate(userData.id,{
                    password : req.body.npass
                }, function(err, updatePass){
                    if(err){
                        req.flash('error','Something wrong');
                        return res.redirect('/generateNewpass') 
                    }
                    else{
                        req.flash('success','password changed successfully');
                        res.cookie('otp','');
                        res.cookie('email','');
                        res.locals.user = userData;
                        return res.redirect('/');
                       
                    }
                })
            }
            else{
                req.flash('error','record not found');
                return res.redirect('/generateNewpass')
            }
        })
    }
    else{
        req.flash('error','password and confirm password not match');
        return res.redirect('/generateNewpass')
    }
}