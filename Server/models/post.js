module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postPicture: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  let User = sequelize.import("./user");
  Post.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(Post);

  return Post;
};
