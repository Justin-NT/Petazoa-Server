module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
      // validate: {
      // is: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/
      // }
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
};
