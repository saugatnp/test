const express = require('express')
const app = express();
app.get('/', (req , res) =>{
    res.send('This is A');
})

//app.use('/b',require("./b.js"));
//app.use('/v', require('./v.js'));


module.exports = app;