import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";
import Store from "./Store.js"; 
import User from "./User.js"; 
import { categories } from "../../config/teto.js";

const Item = class extends Model {
  static associate(models) {
    Item.belongsTo(Store, {
      foreignKey: {
        name: 'store_id',
      },
    });
    Store.hasMany(Item, {
      foreignKey: "store_id",
      sourceKey: "id",
    });
    Item.belongsToMany(User, {
      through: "Favorites",
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
    tags: DataTypes.ARRAY(DataTypes.STRING),
    rating: DataTypes.INTEGER,
    category: DataTypes.ARRAY(DataTypes.ENUM(categories)),
  },
  {
    sequelize,
    modelName: "item",
  }
);

Item.associate();

export default Item;
