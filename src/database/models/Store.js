import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";
import Item from "./Item.js";

const Store = class extends Model {
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
  },
  {
    sequelize,
    modelName: "store",
  }
);

export default Store;
