'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      idImage: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      idUser: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Likes');
  }
};