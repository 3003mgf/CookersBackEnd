const {Router} = require("express");
const router = Router();
const recipeController = require("../controllers/recipeController");

router
       .get("/recipes-to-db", recipeController.recipesToDB)
       .get("/get-all-recipes", recipeController.getAllRecipes)
       .get("/get-recipe/:id", recipeController.getOneRecipe)
       .get("/get-by-name?", recipeController.getByName)
       .get("/get-sorted-by-name/:sort", recipeController.getRecipesSortedByName)
       .get("/get-sorted-by-health/:sort", recipeController.getRecipesSortedByHealth)
       .get("/get-sorted-by-created/:sort", recipeController.getRecipesByCreated)
       .get("/get-sorted-by-diet/:diet", recipeController.getRecipesByDiet)
       .post("/create-recipe", recipeController.createRecipe)


module.exports = router;