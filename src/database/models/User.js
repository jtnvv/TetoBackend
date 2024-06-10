import { Model, DataTypes } from "sequelize";
import sequelize from './index.js'
import Item from "./Item.js";
import Order from "./Order.js";

const User = class extends Model {
  static associate(models) {
    User.belongsToMany(Item, {
      through: "favorites",
      foreignKey: "user_id",
      otherKey: "item_id",
    });
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
    Item.belongsToMany(User, {
      through: "favorites",
      foreignKey: "item_id",
      otherKey: "user_id",
    });
  }
};

User.init(
  {
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    role: DataTypes.STRING,
    verification_code: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "user",
  }
);

User.associate();

export default User;
