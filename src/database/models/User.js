import { Model, DataTypes } from "sequelize";
import sequelize from './index.js'

const User = class extends Model {
};

User.init(
  {
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "user",
  }
);

export default User;
