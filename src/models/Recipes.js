const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const Diet = require("./Diets");

const Recipe = sequelize.define("recipes", {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100,
      },
    },
    dietsInfo: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    stepbyStep: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdIndb: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
},
{
  timestamps: false
}
)

Recipe.belongsToMany(Diet, {through: "recetastipos"});
Diet.belongsToMany(Recipe, {through: "recetastipos"});

module.exports = Recipe;