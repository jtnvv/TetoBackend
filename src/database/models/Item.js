import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";
import Order from "./Order.js";
import Store from "./Store.js";

const Item = class extends Model {
  static associate(models) {
    // En tu modelo Order
    Order.belongsToMany(Item, {
      through: 'order_detail',
      foreignKey: 'order_id',
      otherKey: 'item_id'
    });
    Item.belongsToMany(Order, {
      through: 'order_detail',
      foreignKey: 'item_id',
      otherKey: 'order_id'
    });
    Store.hasMany(Item, {
      foreignKey: "store_id",
      sourceKey: "id",
    });
    Item.belongsTo(Store, {
      foreignKey: {
        name: 'store_id',
      },
    });
  }

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
Item.associate();
export default Item;
