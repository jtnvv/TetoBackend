'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sent_status: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      received_status: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      received_at: {
        type: Sequelize.DATE,
        allowNull: true,
        default: null,
      },
      delivery_addresss: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        primaryKey: false,
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "stores",
          key: "id",
        },
        onDelete: "CASCADE",
        primaryKey: false,
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "items",
          key: "id",
        },
        onDelete: "CASCADE",
        primaryKey: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      parent_order_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "orders",
          key: "id",
        },
        onDelete: "CASCADE",
        primaryKey: false,
      },
      payment_link: {
        type: Sequelize.STRING,
      },
      payment_id: {
        type: Sequelize.STRING,
        allowNull: true,
        default: false,
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
    await queryInterface.dropTable('orders',{cascade:true});
  }
};