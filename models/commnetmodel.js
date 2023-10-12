module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    Description: {
      type: DataTypes.STRING,
    },
    Post_id: {
      type: DataTypes.INTEGER,
    },
  });

  return Comment;
};
