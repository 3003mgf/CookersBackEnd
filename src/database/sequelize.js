require("dotenv").config();
const { POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_DB, PORT } = process.env;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USERNAME, POSTGRES_PASSWORD, {
  host:`0.0.0.0:${PORT}`,
  dialect:"postgres"
});


module.exports = sequelize;