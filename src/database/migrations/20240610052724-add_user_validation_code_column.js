'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'verification_code',
      Sequelize.INTEGER
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'User',
      'verification_code',
      Sequelize.INTEGER
    );
  }
};
