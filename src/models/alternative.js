'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alternative extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Alternative.init({
    idImageRoot: DataTypes.STRING,
    idImageAlter: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Alternative',
  });
  return Alternative;
};