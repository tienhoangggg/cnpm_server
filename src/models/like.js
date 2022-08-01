'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Like.init({
    idImage: {type: DataTypes.STRING, primaryKey: true},
    idUser: {type: DataTypes.INTEGER, primaryKey: true},
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};