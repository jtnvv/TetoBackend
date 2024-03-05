import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";
import Store from "./Store.js";
import User from "./User.js";
import Item from "./Item.js";

const Favorites = class extends Model {
  static associate(models) {
    Favorites.belongsTo(Item, {
      foreignKey: {
        name: "item_id",
        allowNull: false
      },
    });
    Favorites.belongsTo(User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
  }
};

Item.init(
  {
    name: DataTypes.STRING,
    colors: DataTypes.ARRAY(DataTypes.STRING),
    colors_available: DataTypes.ARRAY(DataTypes.INTEGER),
    sizes: DataTypes.ARRAY(DataTypes.STRING),
    sizes_available: DataTypes.ARRAY(DataTypes.INTEGER),
    photo: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "item",
  }
);

Favorites.associate();

export default Item;
