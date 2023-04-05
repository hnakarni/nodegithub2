const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

module.exports.addSubcategory = function(req,res){
    Category.find({}, function(err,cateData){
        if(err){
            console.log(err);
        }
        return res.render('add_subcategory',{
            cData : cateData
        });
    })
    
}


module.exports.insertSubcategoryData = function(req,res){
    // console.log(req.body)
    Subcategory.create({
        categoryId : req.body.categoryId,
        subcategoryName : req.body.subcategory
    }, function(err, subcatedata){
        if(err){
            console.log(err);
        }
        return res.redirect('back');
    })
}

module.exports.viewSubcategory = async function(req,res){
    // Subcategory.find({},function(err,sdata){
    //     if(err){
    //         console.log(err);
    //     }
    //     return res.render('view_subcategory',{
    //         subData : sdata
    //     })
    // })

    let sdata = await Subcategory.find({}).populate('categoryId').exec();
   
    return res.render('view_subcategory',{
                subData : sdata
         })
    
}