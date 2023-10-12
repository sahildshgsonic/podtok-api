module.exports = (sequelize, DataTypes) => {
  const ReelLike = sequelize.define("reelLike", {
    // Post_id: {
    //   type: DataTypes.INTEGER,
    // },
    Email: {
      type: DataTypes.STRING,
    },
  });
  return ReelLike;
};
