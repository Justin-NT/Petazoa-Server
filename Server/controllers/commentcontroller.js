let router = require("express").Router();
let Comment = require("../db").import("../models/comment.js");
const validateSession = require("../middleware/validateSession");

router.get("/mycomment", validateSession, (req, res) => {
  Comment.findAll({
    where: { owner: req.user.id }
  })
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json({ error: err }));
});

router.post("/", (req, res) => {
  let owner = req.user.lastname;
  let comment = req.body.comment;
  let date = req.body.date;
  let time = req.body.time;

  Comment.create(owner, comment, date, time)
    .then(comment => res.status(200).json(comment))
    .catch(err => res.json(err.message));
});

router.get("/:id", (req, res) => {
  Comment.findOne({ where: { id: req.params.id, owner: req.user.id } })
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json({ error: err }));
});

router.put("/:id", validateSession, (req, res) => {
  Comment.update(req.body, {
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
  Comment.destroy({
    where: { owner: userid, id: data }
  }).then(
    (deleteComment = comment => {
      res.send("Review has been removed");
    }),
    (deleteError = err => {
      res.send(500, err.message);
    })
  );
});

module.exports = router;
