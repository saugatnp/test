const express = require('express')
const router = express.Router();
var comments = []
const posts = require("./models/posts")
var like = []


router.get("/", (req, res) => {

    posts.find({

    })
        .then(d => {
            res.json(d.map(w=>{
                var x = w.toObject()
                x.isLiked = x.likes.includes(req.user.username)
                return x;
            }))
        })
        .catch(e => {
            console.log(e)
            res.status(406).json(e)
        })
    // var filterPosts = posts
    //     .map(x => {
    //         var isLiked = like.filter(y => y.username === req.user.username
    //             && y.postId === x.postId);
    //         x.isLiked = isLiked.length > 0
    //         x.comments = comments.filter(y => y.postId === x.postId )
    //         return x;
    //     })
    // res.json(filterPosts)
})
router.post("/add", (req, res) => {
    //console.log(posts, req.user.username)
    const { caption } = req.body;
    if (!caption) res.status(406).json({ error: "no caption" })
    else {
        posts.create({
            caption,
            username: req.user.username
        })
            .then(d => {
                res.json({ caption, username: req.user.username, token: d._id , })
            })
            .catch(e => {
                //console.log(e)
                res.status(406).json(e)
            })
    }
    //     const postId = req.user.username + Math.round(Math.random() * 100000);
    //     posts.push({ caption, username: req.user.username, postId })
    //     res.json({ caption, username: req.user.username, postId })
    // }
})
router.post("/like/:postId", (req, res) => {
    const { postId } = req.params;
    if (!postId) res.status(406).json({ error: "no post id entered" })
    //var liked = like.filter(a => a.postId === postId && a.username === req.user.username)
    posts.findOne({
        _id: postId
    })
        .then(d => {
            if (d) {
                var isLiked = d.likes.includes(req.user.username)
                if (isLiked) {
                    d.likes.pull(req.user.username) ///   dislikes
                }
                else {
                    d.likes.push(req.user.username)    // likes
                }
                d.save()
                    .then(d => res.json({ isLiked: !isLiked }))
                    .catch(e => {
                        res.status(406).json(e)
                    })
            }
            else {
                res.status(406).json({ error: " post not found" })
            }
        })
    // console.log(liked)
    // if (liked.length > 0) {
    //     liked = like.filter(a => a.postId !== postId && a.username !== req.user.username)// changes like to unlike
    //     res.json({ likeStatus: false })
    // }
    // else {
    //     like.push({ username: req.user.username, postId })
    //     res.json({ likeStatus: true })
    // }
})
router.post("/comment/:postId", (req, res) => {
    const { postId } = req.params;
    const { comment } = req.body;
    if (!postId) res.status(406).json({ error: "no post id entered" })

    posts.findOne({
        _id:postId
    })
        .then(d =>{
            if (d){
                d.comments.push({by :req.user.username , comment})
                d.save()
                .then(a =>{
                    res.json({ status : "comment added" })
                })
                .catch(e => {
                    res.status(406).json(e)
                })
            }
            else {
                res.status(406).json({ error: " post not found" })
            }
        })
    // else if (!comment) res.status(406).json({ error: " no comment entered" })
    // else {
    //     comments.push({ username: req.user.username, postId, comment })
    //     res.json({ comment, postId })
    // }
})
module.exports = router;