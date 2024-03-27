import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";

const Item = class extends Model {
};

Item.init(
  {
    name: DataTypes.STRING,
    colors: DataTypes.ARRAY(DataTypes.STRING),
    colors_available: DataTypes.ARRAY(DataTypes.BOOLEAN),
    sizes: DataTypes.ARRAY(DataTypes.STRING),
    sizes_available: DataTypes.ARRAY(DataTypes.BOOLEAN),
    price: DataTypes.STRING,
    photo: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    categories: DataTypes.ARRAY(DataTypes.STRING),
    stock: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "item",
  }
);

export default Item;
