const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Extracategory = require('../models/Extracategory');

module.exports.extrpage = (req,res) =>{
    Category.find({}, function(err,cateData){
        if(err){
            console.log(err);
        }
        return res.render('add_extracategory',{
            'cateData' : cateData
        })
    })
    
}

module.exports.subdata = (req,res)=>{
    // console.log(req.body);
    Subcategory.find({'categoryId': req.body.cateId},function(err,subdata){
        if(err){
            console.log(err)
        }
        // console.log(subdata);
        return res.render('getSuboption',{
            'subcateData' : subdata
        })
    })
}


module.exports.insertExtracategoryData = (req,res)=>{
    // console.log(req.body);
    Extracategory.create(req.body, function(err,extra){
        if(err){
            console.log(err);
        }
        return res.redirect('back');
    })
}