const express = require("express");
const ingredientController = require("../controller/ingredientController");
const authController = require("../controller/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, ingredientController.getAllIngredients)
  .post(authController.protect, ingredientController.postIngredients);

router
  .route("/ingredient-category")
  .get(authController.protect, ingredientController.getIngredientCategory);

router.route("/add-to-shipping").post(authController.protect, ingredientController.postShipping)
router
  .route("/add-to-cart")
  .get(authController.protect, ingredientController.getCart)
  .post(authController.protect, ingredientController.postCart);
router.route("/get-history").get(authController.protect, ingredientController.getHistory);
router.route("/check-by-name").post(authController.protect, ingredientController.getByNames)
router
  .route("/:id")
  .get(authController.protect, ingredientController.getIngredientByID);
router
  .route("/ingredient-by-name/:name")
  .get(authController.protect, ingredientController.getIngredientByName);

module.exports = router;
