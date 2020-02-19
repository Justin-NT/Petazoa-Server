let router = require("express").Router();
let Post = require("../db").import("../models/post");

router.get("/mine", (req, res) => {
  Post.findAll({
    where: { userId: req.user.id }
  })
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ error: err }));
});

router.post("/create", (req, res) => {
  let title = req.body.title;
  let feeling = req.body.feeling;
  let body = req.body.body;
  let userId = req.user.id;

  Post.create({
    title: title,
    feeling: feeling,
    body: body,
    userId: userId
  })
    .then(post => res.status(200).json(post))
    .catch(err => res.json(err.message));
});

router.get("/:id", (req, res) => {
  Post.findOne({
    where: { id: req.params.id, userId: req.user.id },
    include: "user"
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
  Post.destroy({
    where: { id: req.params.id, userId: req.user.id }
  })
    .then(
      (deletePostSuccess = post => {
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
