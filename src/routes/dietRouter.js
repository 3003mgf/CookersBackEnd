const { Router } = require("express");
const router = Router();
const dietController = require("../controllers/dietController");

router
      .get("/diets-to-db", dietController.createAllDiets)
      .get("/get-diets", dietController.getAllDiets)

module.exports = router;