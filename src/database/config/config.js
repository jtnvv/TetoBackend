import { devDatabase, prodDatabase } from "../../config/teto.js";

export default {
  development: {
    username: devDatabase.USER,
    password: devDatabase.PASSWORD,
    database: devDatabase.DB,
    host: devDatabase.HOST,
    dialect: devDatabase.DIALECT,
  },
  test: {
    username: devDatabase.USER,
    password: devDatabase.PASSWORD,
    database: devDatabase.DB,
    host: devDatabase.HOST,
    dialect: devDatabase.DIALECT,
  },
  production: {
    url: prodDatabase.URL,
    username: prodDatabase.USER,
    password: prodDatabase.PASSWORD,
    database: prodDatabase.DB,
    host: prodDatabase.HOST,
    dialect: prodDatabase.DIALECT,
  },
};
