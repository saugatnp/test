const express = require('express')
const app = express();
const mongoose = require('mongoose');
const users = require('./models/Users');
app.use(require("express").json());


mongoose.connect('mongodb://localhost:27017/test',
    { useNewUrlParser: true, useUnifiedTopology: true }
    , () => console.log('mongodb connected.'))

//     users.findOne({ username : 'saugat'})
//  .then( d =>{
//      console.log(d)
//  })


// users.create({
//     username: 'newname',
//     name: "newname",
//     password: "newpass"
// })
//     .then(d => {
//         console.log(d)
//     })
// .catch(e => console.log('err:' , e))

// users.updateOne(
//     { username: 'newname' },
//     { username: 'random' })
//     .then(d => { console.log(d) })
//     .catch(e => console.log("err:", e))

app.post("/users/add", (req, res) => {
    users.create({
        username: req.body.username,
        name: req.body.name,
        password: req.body.pass
    })
        .then(d => {
            res.json(d)
        })
        .catch(e => res.status(406).json(e))
})

app.listen(3000, () => console.log("server stated at port "))
