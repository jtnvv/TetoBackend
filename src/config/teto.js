import dotenv from "dotenv";
dotenv.config();

export const devDatabase = {
  HOST: process.env.POSTGRES_HOST,
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  DB: process.env.POSTGRES_DB,
  DIALECT: "postgres",
};

export const prodDatabase = {
  HOST: "",
  USER: "",
  PASSWORD: "",
  DB: "",
  DIALECT: "postgres",
};

export const node = {
  port: process.env.NODE_DOCKER_PORT
};

export const categories = process.env.TETO_CATEGORIES;

export const client = {
  url: process.env.CLIENT_URL,
}

export const server = {
  secret: process.env.SECRET_SALT,
};