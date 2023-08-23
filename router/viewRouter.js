const express = require("express");
const viewController = require("../controller/viewController");
const authController = require("../controller/authController");
const router = express.Router();

router.route("/").get(authController.protect, viewController.getIngredientsList);      
router
  .route("/ingredient-form")
  .get(authController.protect, viewController.getIngredientsForm)
  .post(authController.protect, viewController.postIngredientsForm)

router.get("/ingredient-update/:id",authController.protect, viewController.getUpdateIngredientsForm);
router.post("/ingredient-update",authController.protect,  viewController.patchUpdateIngredientsForm);
router.post("/ingredient-delete",authController.protect,  viewController.deleteIngredients);


router.route("/login").get(viewController.getLoginForm);
module.exports = router;
