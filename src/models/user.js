'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    role: DataTypes.BOOLEAN,
    fullName: DataTypes.STRING,
    dateofbirth: DataTypes.DATE,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    numOfViol: DataTypes.INTEGER,
    prohibit: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};