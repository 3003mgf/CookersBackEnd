const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define("diets", {
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
}
