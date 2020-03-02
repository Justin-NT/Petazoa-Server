let router = require("express").Router();
let Post = require("../db").import("../models/post");
let User = require("../db").import("../models/user");
let Comment = require("../db").import("../models/comment");

//Grab all posts and the associated comments - good for news feed
router.get("/all", (req, res) => {
  Post.findAll({ include: "comments" }).then(post => {
    Comment.findAll({
      where: { postId: post.id }
    })
      .then(data => {
        res.status(200).json({
          message: "All the posts, and associated comments",
          post: post
        });
      })
      .catch(err => res.status(500).json({ error: err }));
  });
});

//Create new post

router.post("/create", function(req, res) {
  console.log("README", req.user);

  Post.create({
    title: req.body.title,
    feeling: req.body.feeling,
    body: req.body.body,
    userId: req.user.id
  })
    .then(post => res.status(200).json(post))
    .catch(err => res.json(err.message));
});

//Get one post and all of the associated comments
router.get("/:id", (req, res) => {
  Comment.findAll({ where: { postId: req.params.id } }).then(data =>
    Post.findOne({
      where: { id: req.params.id, userId: req.user.id }
    })

      .then(post =>
        res.status(200).json({
          message: "User info is found",
          post: post,
          comment: data
        })
      )
      .catch(err => res.status(500).json({ error: err }))
  );
});

//Update a post
router.put("/:id", (req, res) => {
  Post.update(req.body, {
    where: { id: req.params.id, userId: req.user.id }
  })
    .then(
      (updateSuccess = post => {
        res.json({
          post: post,
          message: "Updated"
        });
      })
    )
    .catch(err => res.status(500).json({ error: err }));
});

//Delete a post
router.delete("/:id", (req, res) => {
  Post.destroy({
    where: { id: req.params.id, userId: req.user.id }
  })
    .then(
      (deletePostSuccess = post => {
        res.send("post has been removed");
      })
    )
    .catch(
      (deleteError = err => {
        res.send(500, err.message);
      })
    );
});

module.exports = router;
