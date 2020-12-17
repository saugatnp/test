const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    username :{
        required : true,
        type : String
    },
    caption : {
        type : String,
        required : true
    },
    likes:[{
        type : String,
        required : true,
        unique : true
    }],
    comments : [{
        by : {
            type : String,
            required : true
        },
        comment : {
            type : String,
            required : true
        }
    }]

})
module.exports = mongoose.model("Posts" , postSchema);