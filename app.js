require("dotenv").config();

const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const port = process.env.PORT;
const recipeRouter = require("./src/routes/recipeRouter");
const dietRouter = require("./src/routes/dietRouter");


app
    .set("port", port)
    .use(express.json())
    .use(cors())
    .use("/recipes", recipeRouter)
    .use("/diets", dietRouter)
    

module.exports = app;