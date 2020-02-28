const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "Social-Pet-Site",
  "postgres",
  process.env.PASS,
  {
    host: "localhost",
    dialect: "postgres"
  }
);

sequelize.authenticate().then(
  function() {
    console.log("Connected to Social-Pet-Site postgres database");
  },
  function(err) {
    console.log(err);
  }
);

// database associations - all routes to user, with comments connected to the post

const Users = sequelize.import("./models/user");
const Posts = sequelize.import("./models/post");
const Profile = sequelize.import("./models/profile");
const Comments = sequelize.import("./models/comment");

// Users.hasMany(Posts);
// Posts.belongsTo(Users, { foreignKey: "userId" });

// Users.hasMany(Comments);
// Comments.belongsTo(Users, { foreignKey: "userForTheCommentId" });
// Comments.belongsTo(Posts, { foreignKey: "postId" });
// Posts.hasMany(Comments);
// Comments.belongsTo(Posts);

Users.hasOne(Profile);
Profile.belongsTo(Users);

module.exports = sequelize;
