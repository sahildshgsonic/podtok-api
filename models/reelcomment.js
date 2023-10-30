module.exports = (sequelize, DataTypes) => {
  const ReelComment = sequelize.define("reelcomment", {
    Description: {
      type: DataTypes.STRING,
    },
    Reel_id: {
      type: DataTypes.INTEGER,
    },
  });

  return ReelComment;
};
