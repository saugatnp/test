const mongoose = require("mongoose")

const loggedSchema = mongoose.Schema({
    token :{
        type : String,
        required : false,
        default : ()=> "abc" + Math.round(Math.random() * 3000)
    },
    username : { 
        type : String,
        required : true
    }
})
module.exports = mongoose.model("loggedUsers" , loggedSchema);