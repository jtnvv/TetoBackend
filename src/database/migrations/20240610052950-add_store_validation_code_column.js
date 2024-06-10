'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'stores',
      'verification_code',
      Sequelize.INTEGER
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'stores',
      'verification_code',
      Sequelize.INTEGER
    );
  }
};
