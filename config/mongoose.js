const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/Bloging");

const db = mongoose.connection;


db.once('open',function(err){
    if(err){
        console.log("db not connected");
    }
    console.log("mongodb is connected");
})

module.exports = db;