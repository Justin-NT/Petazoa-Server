let router = require("express").Router();
let Post = require("../db").import("../models/post");
let User = require("../db").import("../models/user");
let Comment = require("../db").import("../models/comment");

router.get("/mine", (req, res) => {
  Post.findAll({
    where: { userId: req.user.id }
  })
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ error: err }));
});

router.post("/create", function(req, res) {
  console.log("README", req.user);

  // let title = req.body.title;
  // let feeling = req.body.feeling;
  // let body = req.body.body;
  // let userId = req.user.id;

  // User.findOne({
  // where: { id: req.user.id }
  // }).then(user =>
  Post.create({
    title: req.body.title,
    feeling: req.body.feeling,
    body: req.body.body,
    userId: req.user.id
    // userId: userId
  })
    // .then(() => console.log(req.user))
    .then(post => res.status(200).json(post))
    .catch(err => res.json(err.message));
  // );
});

router.get("/:id", (req, res) => {
  Post.findOne({
    where: { id: req.params.id, userId: req.user.id }
    // include: "comment"
  })
    .then(post =>
      res.status(200).json({
        message: "User info is found",
        post: post
      })
    )
    .catch(err => res.status(500).json({ error: err }));
});

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

router.delete("/:id", (req, res) => {
  Post.destroy({
    where: { id: req.params.id, userId: req.user.id }
  })
    .then(
      (deletePostSuccess = post => {
        res.json({ message: "post has been removed", post: post });
      })
    )
    .catch(
      (deleteError = err => {
        res.send(500, err.message);
      })
    );
});

module.exports = router;
