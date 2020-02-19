module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("profile", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    animal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Profile;
};
