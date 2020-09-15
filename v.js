const express = require('express')
const app = express();
 app.get('/', (req,res) =>{
     res.send("This is V");
 })
 app.use('/z', require('./z.js'));
 app.use('/i', require('./i.js'));
 module.exports = app