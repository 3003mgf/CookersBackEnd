const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const Diet = sequelize.define("diets", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  image:{
    type: DataTypes.STRING,
    allowNull: true
  }
},
{
  timestamps: false
}
);


module.exports = Diet;