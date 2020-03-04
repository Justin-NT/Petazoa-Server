const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres"
});

sequelize.authenticate().then(
  function() {
    console.log("Connected to Social-Pet-Site postgres database");
  },
  function(err) {
    console.log(err);
  }
);

// database associations - Profile belongsTo User to attach userId

const Users = sequelize.import("./models/user");
const Profile = sequelize.import("./models/profile");

Users.hasOne(Profile);
Profile.belongsTo(Users);

module.exports = sequelize;
