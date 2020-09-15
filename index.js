const express = require('express')
const app = express();
const port = 3000;
/*
/a/v/i/s/h/e/k
/a/b/c/d/e/f/
/a/v/z/s/a
/a/b/s/h
*/



app.get('/', (req, res) => {
    res.send('hello');
})
app.use('/a', require("./a.js"));

app.get('/form', (req, res) => {
    res.sendFile(__dirname + "/form.html");
})
app.get('/submit', (req, res) => {
    const username = req.query['username'];
    const password = req.query['password'];
    if (username === "abc")
        res.send("logged in")
    else
        res.send("logged out")
})
app.listen(port, () => console.log("server stated at port " + port))
