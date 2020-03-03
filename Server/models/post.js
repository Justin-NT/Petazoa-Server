module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
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
