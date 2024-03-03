const {config}=require('dotenv')
config()

module.exports={
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    SECRET: process.env.SECRET,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_DB: process.env.POSTGRES_DB ,
    POSTGRES_ROOT_PASSWORD: process.env.POSTGRES_ROOT_PASSWORD ,
    POSTGRES_LOCAL_PORT: process.env.POSTGRES_LOCAL_PORT ,
}