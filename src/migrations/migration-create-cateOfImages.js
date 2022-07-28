'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CateOfImages', {
        nameCate: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING
        },
        idImage: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CateOfImages');
  }
};