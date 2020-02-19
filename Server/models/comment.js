module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reaction: {
      type: DataTypes.STRING,
      allowNull: true
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER
    },
    postId: {
      type: DataTypes.INTEGER
    }
  });
  return Comment;
};
