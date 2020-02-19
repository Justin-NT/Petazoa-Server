let router = require("express").Router();
let Comment = require("../db").import("../models/comment.js");
let Post = require("../db").import("../models/post.js");

router.get("/mine", (req, res) => {
  Comment.findAll({
    where: { userId: req.user.id }
  })
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json({ error: err }));
});

router.post("/create/:id", (req, res) => {
  let title = req.body.title;
  let reaction = req.body.reaction;
  let body = req.body.body;
  let userId = req.user.id;
  Post.findOne({ where: { id: req.params.id } })
    .then(data =>
      Comment.create({
        title: title,
        reaction: reaction,
        body: body,
        userId: userId,
        postId: data.id
      })
    )
    .then(comment => res.json({ comment: comment }))
    .catch(err => res.json(err.message));
});

router.get("/:id", (req, res) => {
  Comment.findOne({
    where: { id: req.params.id, userId: req.user.id }
  })
    .then(comment =>
      res.status(200).json({
        message: "comment info is found",
        comment: comment
      })
    )
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
