import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";

const Item = class extends Model {
};

Item.init(
  {
    name: DataTypes.STRING,
    colors: DataTypes.ARRAY(DataTypes.STRING),
    sizes: DataTypes.ARRAY(DataTypes.STRING),
    price: DataTypes.STRING,
    photo: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    categories: DataTypes.ARRAY(DataTypes.STRING),
    stock: DataTypes.INTEGER,
    priority: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "item",
  }
);

export default Item;
