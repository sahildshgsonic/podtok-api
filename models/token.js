module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define("token", {
    userId: {
      type: DataTypes.INTEGER,
    },
    token: {
      type: DataTypes.STRING,
    },
    otp: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      default: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
  return Token;
};
