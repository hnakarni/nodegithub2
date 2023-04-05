const mongoose = require('mongoose');


const ExtraSchema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true
    },
    subcateId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Subcategory",
        required : true
    },
    extracategory : {
        type : String,
        required : true
    }
})

const Extracategory = mongoose.model('Extracategory',ExtraSchema);

module.exports = Extracategory;