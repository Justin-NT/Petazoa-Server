require("dotenv").config();
let express = require("express");
let app = express();

let user = require("./controllers/usercontroller");
let posts = require("./controllers/postcontroller");
let comment = require("./controllers/commentcontroller");
let profile = require("./controllers/profilecontroller");
let sequelize = require("./db");

sequelize.sync();
app.use(express.json());
app.use(require("./middleware/headers"));

app.use("/auth", user);

app.use(require("./middleware/validateSession"));
app.use("/posts", posts);
app.use("/comments", comment);
app.use("/profiles", profile);

app.listen(3000, function() {
  console.log("App is listening on 3000");
});

app.use("/api/test", function(req, res) {
  res.send("This is data from the /api/test endpoint. It's fron the server.");
});
