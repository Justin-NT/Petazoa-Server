let router = require("express").Router();
let Post = require("../db").import("../models/post");
let User = require("../db").import("../models/user");
let Comment = require("../db").import("../models/comment");
let multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;

  const mimetype = filetypes.test(file.mimetype);

  if (mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

//Get personal posts
router.get("/mine", (req, res) => {
  Post.findAll({
    where: { userId: req.user.id },
    order: [["createdAt", "DESC"]]
  })
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ error: err }));
});

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

//Grabs all posts for a user - good for myprofile
router.get("/mine", (req, res) => {
  Post.findAll({
    where: { userId: req.user.id }
  })
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ error: err }));
});

//Create new post

router.post("/create", upload.single("postPicture"), function(req, res) {
  console.log("README", req.file.path);
  console.log("REQUEST IS HERE", req.body);
  let postBody = JSON.parse(req.body.body);
  console.log("POOOSSSTTT BOOODY:", postBody);
  Post.create({
    body: postBody.body,
    userId: req.user.id,
    postPicture: req.file.path
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
  if (req.user.admin === true) {
    Post.destroy({
      where: { id: req.params.id }
    })
      .then(
        (deletePostSuccess = post => {
          res.send("Big brother has censored this post");
        })
      )
      .catch(
        (deleteError = err => {
          res.send(500, err.message);
        })
      );
  } else {
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
  }
});

//Delete functionality for admin
router.delete("/admin/:id", (req, res) => {
  if (req.user.admin === true) {
    Post.destroy({
      where: { id: req.params.id }
    })
      .then(
        (deletePostSuccess = post => {
          res.send("Big brother has censored this post");
        })
      )
      .catch(
        (deleteError = err => {
          res.send(500, err.message);
        })
      );
  } else {
    return "no big brother";
  }
});

module.exports = router;
