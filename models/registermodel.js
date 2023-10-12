module.exports = (sequelize, DataTypes) => {
  const Register = sequelize.define("register", {
    Name: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    Password: {
      type: DataTypes.STRING,
    },
    Verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    Profile: {
      type: DataTypes.STRING,
    },
  });
  return Register;
};
