require("dotenv").config();
const { POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USERNAME, POSTGRES_PASSWORD, {
  host:"database",
  dialect:"postgres"
});


module.exports = sequelize;