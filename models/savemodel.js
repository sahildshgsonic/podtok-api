module.exports = (sequelize, DataTypes) => {
  const Postsave = sequelize.define("postsave", {
    // Post_id: {
    //   type: DataTypes.INTEGER,
    // },
    Email: {
      type: DataTypes.STRING,
    },
  });
  return Postsave;
};
