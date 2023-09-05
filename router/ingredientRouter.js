const express = require("express");
const ingredientController = require("../controller/ingredientController");
const authController = require("../controller/authController");
const router = express.Router();

router.route("/").get(ingredientController.getAllIngredients);

router
  .route("/ingredient-category")
  .get(ingredientController.getIngredientCategory);

router
  .route("/add-to-shipping")
  .post(authController.protect, ingredientController.postShipping);

router
  .route("/add-to-cart")
  .get(authController.protect, ingredientController.getCart)
  .post(authController.protect, ingredientController.postCart);

router
  .route("/delete-cart")
  .post(authController.protect, ingredientController.deleteCart);

router
  .route("/get-history")
  .get(authController.protect, ingredientController.getHistory);
router
  .route("/check-by-name")
  .post(ingredientController.getByNames);
router
  .route("/:id")
  .get(ingredientController.getIngredientByID);
router
  .route("/ingredient-by-name/:name")
  .get(ingredientController.getIngredientByName);

module.exports = router;
