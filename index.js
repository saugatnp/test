const express = require('express')
const app = express();
const port = 3000;
const mongoose = require('mongoose');
app.use(express.json())


var posts = []

const registered = require("./models/registered");
const loggedUser = require("./models/loggedUser")

mongoose.connect('mongodb://localhost:27017/sn',
    { useNewUrlParser: true, useUnifiedTopology: true }
    , () => console.log('mongodb connected.'))

app.post('/register', ({ body }, res) => {
    const { username, password, name } = body;
    if (!username) res.status(406).json({ error: "username not found" });
    else if (!password) res.status(406).json({ error: "password not found" });
    else if (!name) res.status(406).json({ error: "name not found" });
    else {
        //registered.push({ username, password, name })
        registered.create({
            username: username,
            password: password,
            name: name
        })
            .then(d => {
                res.json({ username, password, name })
            })
            .catch(e => res.status(406).json(e))
    }
});

app.use('/login', ({ body }, res) => {
    const { username, password } = body;
    if (!username) res.status(406).json({ error: "username not found" });
    else if (!password) res.status(406).json({ error: "password not found" });
    else {
        //var isRegistered = registered.filter(x => x.username === username && x.password === password);
        registered.countDocuments({ username, password })
            .then(d => {
                if (d > 0) {
                    loggedUser.create({
                        username
                    })
                        .then(d => {
                            res.json({
                                username,
                                token: d.token
                            })
                        })
                        .catch(e => {
                            //console.log(e)
                            res.status(406).json(e)
                        }
                        )
                }
                else
                    res.status(406).json({ error: "user nott found" });
            })
            .catch(e => {
                //console.log(e)
                res.status(406).json(e)
            })
        // if (isRegistered.length > 0) {
        //     const token = username + Math.round(Math.random() * 3000);

        //     loggedUser.push({ username, token })
        //     res.json({ username, token })
        // } else {
        //     res.status(406).json({ error: "user nott found" });
        // }
    }
});

app.post('/submit', (req, res) => {

    const username = req.body['username']; /// can write req.body.username
    const password = req.body['password'];
    if (username === "abc")
        res.send("logged in")
    else
        res.send("logged out")
})
app.post('/user', ({ headers }, res) => {
    //console.log(headers)
    const { authorization } = headers;
    var login = loggedUser.filter(a => a.token === authorization)
    if (login.length > 0) {
        res.send(loggedUser);
    } else {
        res.status(406).json({ error: "soory not found" });
    }
})
const checkAuthorization = (req, res, next) => {
    const { authorization } = req.headers;
    loggedUser.findOne({
        token: authorization
    })
        .then(d => {
            if (d) {
                req.user = d
                next()
            }
            else {
                res.status(406).json({ error: "sorry user not found" })
            }
        })

    // var login = loggedUser.filter(a => a.token === authorization)
    // if (login.length > 0) {
    //     //console.log(loggedUser)
    //     req.user = login[0]
    //     next()
    // } else {
    //     res.status(406).json({ error: "sorry user not found" });
    // }
}

app.get("/like", checkAuthorization, (req, res) => {
    var liked = like
        .filter(a => a.username === req.user.username)
        .map(a => {
            a.caption = posts.filter()
            return a
        })
})
var comments = []

var like = []

app.use("/posts", checkAuthorization, require("./posts.js"))

app.listen(port, () => console.log("server stated at port " + port))