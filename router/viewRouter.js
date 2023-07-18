const express = require("express");
const viewController = require("../controller/viewController");
const router = express.Router();

router.route("/").get(viewController.getIngredientsList);      
router
  .route("/ingredient-form")
  .get(viewController.getIngredientsForm)
  .post(viewController.postIngredientsForm)


router.get("/ingredient-update/:id", viewController.getUpdateIngredientsForm);
router.post("/ingredient-update",  viewController.patchUpdateIngredientsForm);
router.post("/ingredient-delete",  viewController.deleteIngredients);
module.exports = router;
