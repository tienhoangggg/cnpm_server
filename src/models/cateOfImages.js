'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CateOfImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  //hay quas na oiw
  
  CateOfImages.init({
    nameCate: {type: DataTypes.STRING, primaryKey: true},
    idImage: {type: DataTypes.STRING, primaryKey: true},
  }, {
    sequelize,
    modelName: 'CateOfImages',
  },{
    
  });
  return CateOfImages;
};