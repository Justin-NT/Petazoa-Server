module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    owner: {
      type: DataTypes.STRING
    },
    status: {
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
    },
    comment: {
      type: DataTypes.STRING
    }
  });

  // Post.associate = models => {
  //   Post.belongsTo(models.user, { as: "user", foreignKey: "userId" });
  // };
  return Post;
};
