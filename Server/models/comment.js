module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    owner: {
      type: DataTypes.STRING
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  });

  // Comment.associate = models => {
  //   Comment.belongsTo(models.post, { as: "post", foreignKey: "postId" });
  // };
  return Comment;
};
