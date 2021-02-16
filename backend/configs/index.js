require('dotenv').config();
const mysql = require("mysql");

const {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  DB_URL,
} = process.env;

const port = (NODE_ENV === 'production' && PORT) ? PORT : '3000';
const jwtSecret = (NODE_ENV === 'production' && JWT_SECRET) ? JWT_SECRET : 'some-secret-key';
const dbUrl = (NODE_ENV === 'production' && DB_URL) ? DB_URL : 'mongodb://localhost:27017/mydb5';

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodejs",
  port: "8889",
});

module.exports = {
  PORT: port,
  JWT_SECRET: jwtSecret,
  db
};
