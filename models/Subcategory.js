const mongoose = require('mongoose');

const subcategorySchema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    subcategoryName : {
        type : String,
        required : true
    }
})

const Subcategory = mongoose.model('Subcategory',subcategorySchema);

module.exports = Subcategory;