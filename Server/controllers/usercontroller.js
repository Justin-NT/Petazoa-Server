let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let User = sequelize.import("../models/user");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let password = req.body.password;
  let admin = req.body.admin;

  User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: bcrypt.hashSync(password, 13),
    admin: admin
  })
    .then(
      (createSuccess = user => {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24
        });

        res.json({
          user: user,
          message: "User created",
          sessionToken: token
        });
      })
    )
    .catch(
      (createError = err => {
        res.send(500, "Improper signup", err.message);
        console.log(err);
      })
    );
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
