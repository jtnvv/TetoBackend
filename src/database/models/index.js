import Sequelize from "sequelize";
import dbConfig from "../config/config.js";

const environment = process.env.NODE_ENV; 
const config = dbConfig[environment];
let sequelize;

if(config.url){
  sequelize = new Sequelize(config.url,
    {
      dialect: config.dialect,
    }
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
    }
  );
}
  
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection to database established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

export default sequelize;
