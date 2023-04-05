const Admin = require('../../models/Admin');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

module.exports.userData = async (req,res)=>{

    let AdminData = await Admin.find({});
    return res.json({'state':"success",'data':AdminData})
}


module.exports.insertApiRecord = async function(req,res){
    
    let oldRecord = await Admin.findOne({email : req.body.email});
    if(oldRecord){
        return res.json({'status':200, 'msg': "email is already register! try new email id"});
    }
    else{

        if(req.file){
            var imagePath = Admin.avatarPath+"/"+req.file.filename;
            req.body.avatar = imagePath;
            let record = await Admin.create(req.body);
            if(record){
                return res.json({'status':200, 'msg': "record inserted successfully",'data':record});
            }
            else{
                return res.json({'status':200, 'msg': "Something wrong"});
            }
        }
    }
    
}


module.exports.deleteApiRecord = async (req,res)=>{
    
    let record = await Admin.findByIdAndDelete(req.params.id);
    if(record){
        return res.json({'status':200, 'msg': "record Deleted successfully"});
    }
    else{
        return res.json({'status':200, 'msg': "Something wrong"});
    }
}




module.exports.updateApiRecord = async (req,res)=>{
    // console.log(req.params.id);
    // console.log(req.body);
    // console.log(req.file);

    let oldRecord = await Admin.findById(req.params.id);
    if(oldRecord){
        // console.log(path.join(__dirname,'../../',oldRecord.avatar))
        fs.unlinkSync(path.join(__dirname,'../../',oldRecord.avatar));

        if(req.file){
            var imagePath = Admin.avatarPath+"/"+req.file.filename;
            req.body.avatar = imagePath;
            let record = await Admin.findByIdAndUpdate(req.params.id,req.body);
            if(record){
                return res.json({'status':200, 'msg': "record Updated successfully"});
            }
            else{
                return res.json({'status':200, 'msg': "Something wrong"});
            }
        }
        else{
            let record = await Admin.findByIdAndUpdate(req.params.id,req.body);
            if(record){
                return res.json({'status':200, 'msg': "record Updated successfully"});
            }
            else{
                return res.json({'status':200, 'msg': "Something wrong"});
            }
            
        }
    }
    else{
        return res.json({'status':200, 'msg': "No record found"});
    }

    

}


module.exports.checkLogin = async (req,res) =>{
    let AdminData = await Admin.findOne({email : req.body.email});
    if(!AdminData || AdminData.password !== req.body.password){
        return res.json({'status':200,'msg':"Invalid email & password"})
    }
    else{
       
       let tokenStore1 = await Admin.findByIdAndUpdate(AdminData.id,{
        token : "",
        isLogin : false
       });


      let newAdminData = await Admin.findById(AdminData.id);
       if(tokenStore1)
       {

            let token = jwt.sign(newAdminData.toJSON(),'Coding',{expiresIn : "100000"});
            let tokenStore = await Admin.findByIdAndUpdate(AdminData.id,{
                token : token,
                isLogin : true
                });
        return res.json({'status':200,'msg':"Token Generated successfully",'token':token});
       }
       else{
        return res.json({'status':400,'msg':"Something wrong"});
       }

       
    }
}


module.exports.apiLogout = async (req,res)=>{
    let AdminData = await Admin.findById(req.params.id);
    if(AdminData.isLogin){
        let logoutData = await  Admin.findByIdAndUpdate(req.params.id,{
                        isLogin : false,
                        token : ''
                    });
        if(logoutData){
            return res.json({'status':200,'msg':"Logout Successfully"});
        }
        else{
            return res.json({'status':400,'msg':"Something wrong"});
        }
    }
    else{
        return res.json({'status':400,'msg':"Something wrong"});
    }
}