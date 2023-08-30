const express = require("express");
const viewController = require("../controller/viewController");
const authController = require("../controller/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, viewController.getIngredientsList);
router
  .route("/ingredient-form")
  .get(authController.protect, viewController.getIngredientsForm)
  .post(authController.protect, viewController.postIngredientsForm);

router.get(
  "/ingredient-update/:id",
  authController.protect,
  viewController.getUpdateIngredientsForm
);
router.post(
  "/ingredient-update",
  authController.protect,
  viewController.patchUpdateIngredientsForm
);
router.post(
  "/ingredient-delete",
  authController.protect,
  viewController.deleteIngredients
);

router.route("/users").get(authController.protect, viewController.getAllUsers);

router
  .route("/user-delete")
  .post(authController.protect, viewController.deleteUser);

router.get(
  "/user-update/:id",
  authController.protect,
  viewController.updateUser
);

router.post("/user-update", authController.protect, viewController.saveUser);

router.route("/meal-form").get(authController.protect, viewController.getMealForm);
router.route("/meal-form").post(authController.protect, viewController.postMealForm);

router.get(
  "/meal-update/:id",
  authController.protect,
  viewController.getEditMealForm
);

router.post(
  "/meal-update",
  authController.protect,
  viewController.postEditMealForm
);

router.post(
  "/meal-delete",
  authController.protect,
  viewController.deleteMeal
);



router.route("/meals").get(authController.protect, viewController.mealList);





router.route("/login").get(viewController.getLoginForm);
module.exports = router;
