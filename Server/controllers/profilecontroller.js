let router = require("express").Router();
let sequelize = require("../db");
let Profile = sequelize.import("../models/profile");
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

router.get("/mine", (req, res) => {
  Profile.findAll({
    where: {
      userId: req.user.id
    }
  })
    .then(profile => res.status(200).json(profile))
    .catch(err => res.status(500).json({ error: err }));
});

router.post("/create", upload.single("profilePicture"), (req, res, next) => {
  console.log(req.file);
  // let name = req.body.name;
  // let animal = req.body.animal;
  // let gender = req.body.gender;
  // let bio = req.body.bio;
  // let userId = req.user.id;

  Profile.create({
    name: req.body.name,
    animal: req.body.animal,
    gender: req.body.gender,
    bio: req.body.bio,
    userId: req.user.id,
    profilePicture: req.body.profilePicture
  })
    .then(profile => res.status(200).json(profile))
    .catch(err => res.json(err.message));
});

router.get("/:id", (req, res) => {
  Profile.findOne({
    where: { id: req.params.id, userId: req.user.id },
    include: "user"
  })
    .then(profile =>
      res.status(200).json({
        message: "Profile info found",
        profile: profile
      })
    )
    .catch(err => res.status(500).json({ error: err }));
});

router.put("/:id", (req, res) => {
  Profile.update(req.body, {
    where: { id: req.params.id, userId: req.user.id }
  })
    .then(
      (updateSuccess = profile => {
        res.json({
          profile: profile,
          message: "profile updated"
        });
      })
    )
    .catch(err => err.status(500).json({ error: err }));
});

router.delete("/:id", (req, res) => {
  Profile.destroy({
    where: { id: req.params.id, userId: req.user.id }
  })
    .then(
      (deleteProfileSuccess = profile => {
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
