module.exports = (sequelize, DataTypes) => {
  const Reel = sequelize.define("reel", {
    Title: {
      type: DataTypes.STRING,
    },
    Description: {
      type: DataTypes.TEXT,
    },
    Reel: {
      type: DataTypes.STRING(10000),
    },
    published: {
      type: DataTypes.BOOLEAN,
    },
  });

  return Reel;
};
