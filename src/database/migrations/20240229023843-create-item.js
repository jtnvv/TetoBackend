'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = await import("../../config/teto.js").then(
      (module) => module.categories
      );
    await queryInterface.createTable("items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      colors: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      colors_available: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
      },
      sizes: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      sizes_available: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      category: {
        type: Sequelize.ARRAY(Sequelize.ENUM(categories)),
        allowNull: false,
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "stores",
          key: "id",
        },
        onDelete: "CASCADE",
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('items');
  }
};