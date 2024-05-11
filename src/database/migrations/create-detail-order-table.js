'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order_detail", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "orders",
          key: "id",
        },
        onDelete: "CASCADE",
        primaryKey: true,
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        primaryKey: true,
      },
      item_id: {
        type: Sequelize.STRING,
        allowNull: false,
        onDelete: "CASCADE",
        primaryKey: true,
      },
      item_id: {
        type: Sequelize.STRING,
        allowNull: false,
        onDelete: "CASCADE",
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_detail');
  }
};