module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  let User = sequelize.import("./user");
  let Post = sequelize.import("./post");

  Comment.belongsTo(User, { foreignKey: "userId" });

  Comment.belongsTo(Post, { foreignKey: "postId" });

  return Comment;
};
