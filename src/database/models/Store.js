import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";
import Item from "./Item.js";
import User from "./User.js";
import Order from "./Order.js";

const Store = class extends Model {
  static associate(models) {
    Store.hasMany(Item, {
      foreignKey: "store_id",
      sourceKey: "id",
    });
    Item.belongsTo(Store, {
      foreignKey: {
        name: 'store_id',
      },
    });
    Item.belongsToMany(User, {
      through: "Favorites",
    });

    Order.belongsTo(Store, {
      foreignKey: {
        name: 'store_id',
        allowNull: false,
      },
    });
    Store.hasMany(Order, {
      foreignKey: "store_id",
      sourceKey: "id",
    });
  }
};

await Store.init(
  {
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    description: DataTypes.STRING,
    logo: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "store",
  }
);

Store.associate();

export default Store;
