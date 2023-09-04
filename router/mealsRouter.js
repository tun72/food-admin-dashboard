const express = require("express");
const ingredientController = require("../controller/ingredientController");
const mealController = require("../controller/mealController");
const router = express.Router();

router.route("/").get(mealController.getMeals);
router.route("/:id").get(mealController.getMealBYId);

module.exports = router;
