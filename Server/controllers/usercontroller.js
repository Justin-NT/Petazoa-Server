let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 13)
  })
    .then(user => {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });

      res.json({
        user: user,
        message: "user created!",
        sessionToken: token
      });
    })
    .catch(err => res.send(500, { error: err }));
});

router.post("/signin", (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then(
    function(user) {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function(
          err,
          matches
        ) {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24
            });
            res.json({
              user: user,
              message: "User authenticated",
              sessionToken: token
            });
          } else {
            res.status(502).send({ error: "Incorrect email and/or password " });
          }
        });
      } else {
        res.status(500).send({ error: "Failed to authenticate" });
      }
    },
    function(err) {
      res.status(501).send({ error: "unable to authenticate user" });
    }
  );
});

module.exports = router;
