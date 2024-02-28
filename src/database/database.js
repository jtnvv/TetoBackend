import Sequelize from 'sequelize';
import {database} from '../config/db.config.js';

export const sequelize = new Sequelize(
  database.DB,
  database.USER,
  database.PASSWORD,
  {
    host: database.HOST,
    dialect: database.DIALECT,
  }
);