const express = require('express')
const app = express();
const port = 3000;
/*
/a/v/i/s/h/e/k
/a/b/c/d/e/f/
/a/v/z/s/a
/a/b/s/h
*/

app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello');
})
app.use('/a', require("./a.js"));

app.get('/form', (req, res) => {
    res.sendFile(__dirname + "/form.html");
})

var registered = [];
var loggedUser = [];
var posts = []
app.use('/login', ({ body }, res) => {
    const { username, password } = body;
    if (!username) res.status(406).json({ error: "username not found" });
    else if (!password) res.status(406).json({ error: "password not found" });
    else {
        var isRegistered = registered.filter(x => x.username === username && x.password === password);
        if (isRegistered.length > 0) {
            const token = username + Math.round(Math.random() * 3000);

            loggedUser.push({ username, token })
            res.json({ username, token })
        } else {
            res.status(406).json({ error: "user nott found" });
        }
    }
});
app.use('/register', ({ body }, res) => {
    const { username, password, name } = body;
    if (!username) res.status(406).json({ error: "username not found" });
    else if (!password) res.status(406).json({ error: "password not found" });
    else if (!name) res.status(406).json({ error: "name not found" });
    else if (registered.filter(x => x.username === username).length > 0) res.status(406).json({ error: 'user already exixtes' });
    else {
        registered.push({ username, password, name })
        res.json({ username, password, name })
    }
})
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
    var login = loggedUser.filter(a => a.token === authorization)
    if (login.length > 0) {
        //console.log(loggedUser)
        req.user = login[0]
        next()
    } else {
        res.status(406).json({ error: "sorry user not found" });
    }
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

app.use("/posts", checkAuthorization,require("./posts.js"))

app.listen(port, () => console.log("server stated at port " + port))