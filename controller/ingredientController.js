const Ingredient = require("../model/ingredientModel");

exports.getAllIngredients = (req, res, next) => {
  return res.status(200).json({
    message: "Success.",
  });
};

exports.postIngredients = async (req, res, next) => {
  await Ingredient.create(req.body);

  return res.status(200).redirect("/admin");
};
