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
/*app.get('/submit', (req, res) => {
    const username = req.query['username'];
    const password = req.query['password'];
    if (username === "abc")
        res.send("logged in")
    else
        res.send("logged out")
})*/
app.post('/submit', (req, res) => {

    const username = req.body['username']; /// can write req.body.username
    const password = req.body['password'];
    if (username === "abc")
        res.send("logged in")
    else
        res.send("logged out")
})
var registered = [];
var loggedUser = [];
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
var posts = []

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
app.get("/post", checkAuthorization, (req, res) => {

    var new_post = posts.filter(a => a.username === req.user.username)
    res.json(new_post)
})
app.post("/post/add", checkAuthorization, (req, res) => {
    //console.log(posts, req.user.username)
    const { caption } = req.body;
    if (!caption) res.status(406).json({ error: "no caption" })
    else {
        const postId = req.user.username + Math.round(Math.random() * 100000);
        posts.push({ caption, username: req.user.username, postId })
        res.json({ caption, username: req.user.username, postId })
    }

})
app.get("/like",checkAuthorization, (req, res) => {
    var liked = like.filter( a => a.username === req.user.username)
    console.log(liked.postId)
    var likedPost = posts.filter( a => a.postId === liked.postId)
    console.log(likedPost.caption, req.user.username , likedPost.postId)
    req.json({caption : likedPost.caption , username: req.user.username , postId : likedPost.postId })
})
var like = []
app.post("/like/:postId", checkAuthorization, (req, res) => {
    const { postId } = req.params;
    if (!postId) res.status(406).json({ error: "no post id entered" })
    var liked = like.filter(a => a.postId === postId && a.username === req.user.username)
    console.log(liked)
    if (liked.length > 0) {
        liked = like.filter(a => a.postId !== postId && a.username !== req.user.username)// changes like to unlike
        res.json({ likeStatus: false })
    }
    else {
        like.push({ username: req.user.username, postId })
        res.json({ likeStatus: true })
    }
})
app.listen(port, () => console.log("server stated at port " + port))
/*
TASK : Make array of likes and make a system to like a post

    HINT : make a array of likes and a route where you send postid and append like

    then make another route which shows list of liked users in a post */
