require("dotenv").config();
const fs = require('fs');
const path = require('path');
const { POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_DB, DB_DEPLOY } = process.env;

const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USERNAME, POSTGRES_PASSWORD, {
//   host:"localhost",
//   dialect:"postgres"
// });


const sequelize = new Sequelize(
  DB_DEPLOY,
  {
    logging:false,
    native:false
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

console.log(__dirname);

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join("/Users/spicyb/Desktop/PI-BACK/src", '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join("/Users/spicyb/Desktop/PI-BACK/src", '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Recipes, Diets } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Recipes.belongsToMany(Diets, { through: 'recetastipos' });
Diets.belongsToMany(Recipes, { through: 'recetastipos' });


module.exports = {
  Recipes,
  Diets,// para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,
};