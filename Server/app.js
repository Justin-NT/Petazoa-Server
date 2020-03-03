require("dotenv").config();
let express = require("express");
let app = express();

let user = require("./controllers/usercontroller");
let posts = require("./controllers/postcontroller");
let profile = require("./controllers/profilecontroller");
let comment = require("./controllers/commentcontroller");
let sequelize = require("./db");
// let multer = require("./middleware/multer");

sequelize.sync();
// sequelize.sync({ force: true });
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(require("./middleware/headers"));

app.use("/auth", user);

app.use(require("./middleware/validateSession"));
app.use("/profiles", profile);
app.use("/posts", posts);
app.use("/comments", comment);

app.listen(process.env.PORT, function() {
  console.log(`App is listening on port ${process.env.PORT}`);
});

app.use("/api/test", function(req, res) {
  res.send("This is data from the /api/test endpoint. It's fron the server.");
});
