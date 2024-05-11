import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";
import Store from "./Store.js";


const Order = class extends Model {
  static associate(models) {
    Order.belongsTo(Store, {
      foreignKey: {
        name: 'store_id',
        allowNull: false,
      },
    });
    Order.belongsTo(Order, {
      foreignKey: {
        name: 'parent_order_id',
        allowNull: true,
      },
    });
    Store.hasMany(Order, {
      foreignKey: "store_id",
      sourceKey: "id",
    });
  }
};

Order.init(
  {
    sent_status: DataTypes.BOOLEAN,
    received_status: DataTypes.BOOLEAN,
    received_at: DataTypes.DATE,
    delivery_addresss: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    payment_link: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "order",
  }
);

Order.associate();

export default Order;
