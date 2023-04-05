const Category = require('../models/Category');

module.exports.add_category = (req,res) =>{
    return res.render('add_category');
}

module.exports.insertCategoryData = function(req,res){
    // console.log(req.body);
    req.body.isactive=1;
    Category.create(req.body,function(err,data){
        if(err){
            console.log("something wrong");
            return false;
        }
        req.flash('success',"Category record inserted");
        return res.redirect('back');
    })
}


module.exports.viewCategory = async (req,res)=>{
    // Category.find({'isactive':1}, function(err,cData){
    //     if(err){
    //         console.log(err);
    //     }
    //     let deactive = await Category.find({'isactive':0});
    //     return res.render('view_category',{
    //         catData : cData
    //     })
    // })
  
    var first = 'tro';

    // let activeData = await Category.find({"category": new RegExp(first)});
    let activeData = await Category.find({"isactive": 1});
    let deactiveData = await Category.find({'isactive':0});

    return res.render('view_category',{
        catData : activeData,
        dcateData  : deactiveData
    })

    
}


module.exports.searchingData = async (req,res)=>{
   
       let activeData = await Category.find({"category": new RegExp(req.body.search)});
       let deactiveData = await Category.find({'isactive':0});
       return res.render('view_category',{
        catData : activeData,
        dcateData  : deactiveData
    })
}

module.exports.deactiveStatus = (req,res)=>{
    Category.findByIdAndUpdate(req.params.id,{
        'isactive' : 0
    }, function(err,updateDat){
        if(err){
            console.log(err);
        }
        return res.redirect('back');
    })
}


module.exports.activeStatus = (req,res)=>{
    Category.findByIdAndUpdate(req.params.id,{
        'isactive' : 1
    }, function(err,updateDat){
        if(err){
            console.log(err);
        }
        return res.redirect('back');
    })
}