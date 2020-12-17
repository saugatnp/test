const mongoose = require("mongoose")


const registeredSchema = mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true,
        min : [6, " minimum character required is 6"]
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('registered' ,  registeredSchema);