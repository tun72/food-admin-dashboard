const express = require("express");
const ingredientController = require("../controller/ingredientController");
const router = express.Router();

router
  .route("/")
  .get(ingredientController.getAllIngredients)
  .post(ingredientController.postIngredients)
module.exports = router;
