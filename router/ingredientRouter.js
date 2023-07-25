const express = require("express");
const ingredientController = require("../controller/ingredientController");
const authController = require("../controller/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect,ingredientController.getAllIngredients)
  .post(authController.protect, ingredientController.postIngredients)
module.exports = router;
