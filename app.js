require("dotenv").config();

const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 3001;
const recipeRouter = require("./src/routes/recipeRouter");
const dietRouter = require("./src/routes/dietRouter");


app
    .use(express.json())
    .use(cors())
    .use(logger("dev"))
    .use("/recipes", recipeRouter)
    .use("/diets", dietRouter)
    

module.exports = app;