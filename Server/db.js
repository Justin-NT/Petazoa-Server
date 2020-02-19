const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "Social-pet-site",
  "postgres",
  process.env.PASSWORD,
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

module.exports = sequelize;
