'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      imageName: {
        type: Sequelize.STRING
      },
      idUser: {
        type: Sequelize.INTEGER
      },
      numOfLike: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      numOfStar: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      description: {
        type: Sequelize.TEXT
      },
      numOfReport: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    await queryInterface.dropTable('Images');
  }
};