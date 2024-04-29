import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";
import User from "./User.js";
import Store from "./Store.js";
import Item from "./Item.js";


const Order = class extends Model {
  static associate(models) {

    
    Order.belongsTo(User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
      
    User.hasMany(Order, {
      foreignKey: "user_id",
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
  },
  {
    sequelize,
    modelName: "order",
  }
);

Order.associate();

export default Order;
