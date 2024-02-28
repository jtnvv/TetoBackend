import app from './app.js';
import 'dotenv/config'
import {sequelize} from './database/database.js';

async function main() {
  try{
    await sequelize.authenticate();
    app.listen(process.env.NODE_DOCKER_PORT, () => {
      console.log("Server listening on port 8080");
    });
  } catch(error) {
    console.log('Unable to connecto to database: ', error);
  }
}
