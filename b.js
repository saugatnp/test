const express = require('express')
const app = express();
 app.get('/', (req ,res) => {
     res.send("This is B");
 })
app.use('/c', require("./c.js"));
app.use('/s', require("./s.js"));

module.exports = app;