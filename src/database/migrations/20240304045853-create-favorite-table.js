'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("favorites", {
      // item_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "items",
      //     key: "id",
      //   },
      //   onDelete: "CASCADE",
      // },
      // user_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "users",
      //     key: "id",
      //   },
      //   onDelete: "CASCADE",
      // },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('favorites');
  }
};
