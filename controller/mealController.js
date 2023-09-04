const Meal = require("../model/mealsModel");
exports.getMeals = async (req, res, next) => {
  let meals = await Meal.find();

  meals.forEach((meal, i) => {
    meals[i].idMeal = meal._id;
  });

  res.status(200).json({
    status: "Success",
    meals,
  });
};

exports.getMealBYId = async (req, res, next) => {
  try {
    let meals = await Meal.findOne({_id: req.params.id});
    meals = [meals];
    res.status(200).json({
      status: "Success",
      meals,
    });
  } catch (err) {
    console.log(err);
  }
};
