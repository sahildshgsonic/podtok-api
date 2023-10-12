module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("like", {
    // Post_id: {
    //   type: DataTypes.INTEGER,
    // },
    Email: {
      type: DataTypes.STRING,
    },
  });
  return Like;
};
