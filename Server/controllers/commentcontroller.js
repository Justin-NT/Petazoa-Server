let router = require("express").Router();
let Comment = require("../db").import("../models/comment.js");
let User = require("../db").import("../models/user");
let Post = require("../db").import("../models/post.js");

router.get("/mine", (req, res) => {
  Comment.findAll({
    where: { userId: req.user.id }
  })
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json({ error: err }));
});

router.post("/create/:id", (req, res) => {
  // let title = req.body.title;
  // let reaction = req.body.reaction;
  // let body = req.body.body;
  // let userId = req.user.id;
  Post.findOne({ where: { id: req.params.id } }).then(data => {
    // User.findOne({
    // where: { id: req.user.id }
    // }).then(user =>
    console.log("THE DATA IS HERE!!!!!!!!!" + data.dataValues.id, req.user.id);
    Comment.create({
      // title: req.body.title,
      // reaction: req.body.reaction,
      comment: req.body.comment,
      userId: req.user.id,
      postId: data.dataValues.id
    })
      .then(comment => res.json({ comment: comment }))
      .catch(err => res.json(err.message));
    // )
  });
});

router.get("/:id", (req, res) => {
  Comment.findAll({
    where: { postId: req.params.id },
    include: "post"
  })
    .then(comment => res.json({ comment: comment }))
    .catch(err => res.status(500).json({ error: err }));
});

router.put("/:id", (req, res) => {
  Comment.update(req.body, {
    where: { id: req.params.id, userId: req.user.id }
  })
    .then(
      (updateSuccess = comment => {
        res.json({
          comment: comment,
          message: "Updated"
        });
      })
    )
    .catch(err => res.status(500).json({ error: err }));
});

router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: { id: req.params.id, userId: req.user.id }
  })
    .then(
      (deleteCommentSuccess = comment => {
        res.send("profile has been removed");
      })
    )
    .catch(
      (deleteError = err => {
        res.send(500, err.message);
      })
    );
});

module.exports = router;
