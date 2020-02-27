module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    feeling: {
      type: DataTypes.STRING,
      allowNull: true
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  let User = sequelize.import("./user");
  Post.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(Post);

  return Post;
};
