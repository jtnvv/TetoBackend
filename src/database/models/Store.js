import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";

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
    role: DataTypes.STRING,
    verification_code: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "store",
  }
);

export default Store;
