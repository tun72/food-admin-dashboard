const express = require("express");
const viewController = require("../controller/viewController");
const authController = require("../controller/authController");
const router = express.Router();
const { body } = require("express-validator");
const handelErrorMessage = require("../middlewares/handelErrorMessage");

// ingredients
router
  .route("/")
  .get(authController.protect, viewController.getIngredientsList);

router
  .route("/ingredient-form")
  .get(authController.protect, viewController.getIngredientsForm)
  .post(
    authController.protect,
    [
      body("name")
        .notEmpty()
        .isString()
        .isLength({ min: 3, max: 40 })
        .withMessage(
          "Ingredients Name must be at least 3 and at most 40 characters long."
        ),
      body("description")
        .notEmpty()
        .isLength({ min: 5, max: 100 })
        .withMessage(
          "Description must be at least 5 and at most 100 characters long."
        ),
      body("rating")
        .notEmpty()
        .isFloat({ min: 1.0, max: 5.0 })

        .withMessage("Rating must be between 1 and 5"),
      body("quantity")
        .isNumeric()
        .notEmpty()
        .withMessage("Quantity must be Numeric."),
      body("category").isString().withMessage("Category must be string."),
      body("price").isNumeric().withMessage("Price must be Numeric."),
      body("imageUrl")
        .isString()
        .isURL()
        .notEmpty()
        .withMessage("ImageUrl is not valid."),
    ],
    handelErrorMessage,
    viewController.postIngredientsForm
  );

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

router
  .route("/meal-form")
  .get(authController.protect, viewController.getMealForm);
router
  .route("/meal-form")
  .post(authController.protect, viewController.postMealForm);

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

router.post("/meal-delete", authController.protect, viewController.deleteMeal);

router.route("/meals").get(authController.protect, viewController.mealList);

router
  .route("/orders")
  .get(authController.protect, viewController.getOrderList);
router
  .route("/orders/success/:id")
  .get(authController.protect, viewController.successOrder);
router
  .route("/orders/fail/:id")
  .get(authController.protect, viewController.failOrder);

router
  .route("/orders/detail/:id")
  .get(authController.protect, viewController.getOrderList);

// router.route("/orders/pdf").get(viewController.createPdf);

router.route("/login").get(viewController.getLoginForm);
module.exports = router;
