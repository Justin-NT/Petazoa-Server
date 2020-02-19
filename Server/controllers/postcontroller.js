let router = require("express").Router();
let Post = require("../db").import("../models/post");
const validateSession = require("../middleware/validateSession");

router.get("/mine", validateSession, (req, res) => {
  Post.findAll({
    where: { owner: req.user.id }
  })
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ error: err }));
});

router.post("/status", (req, res) => {
  let owner = req.user.lastname;
  let status = req.body.status;
  let date = req.body.date;
  let time = req.body.time;
  let comment = req.body.comment;

  Post.create(owner, status, date, time, comment)
    .then(post => res.status(200).json(post))
    .catch(err => res.json(err.message));
});

router.get("/:id", (req, res) => {
  Post.findOne({ where: { id: req.params.id, owner: req.user.id } })
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ error: err }));
});

router.put("/:id", validateSession, (req, res) => {
  Post.update(req.body, {
    where: { id: req.params.id, owner: req.user.id }
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

router.delete("/:id", validateSession, (req, res) => {
  let userid = req.user.id;
  let data = req.params.id;
  Post.destroy({
    where: { owner: userid, id: data }
  }).then(
    (deletePost = post => {
      res.send("Review has been removed");
    }),
    (deleteError = err => {
      res.send(500, err.message);
    })
  );
});

module.exports = router;
