const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  strMeal: {
    type: String,
    required: [true, "Please insert valid data"],
  },

  strCategory: {
    type: String,
    required: [true, "Please insert valid data"],
  },

  strArea: {
    type: String,
    default: "Myanmar",
  },

  strInstructions: {
    type: String,
    required: [true, "Please Insert valid data"],
  },

  strMealThumb: {
    type: String,
    required: [true, "Please Insert valid data"],
  },
  strTags: {
    type: String,
    required: [true, "Please Insert valid data"],
  },
  strYoutube: {
    type: String,
    default: null,
  },

  strIngredient1: {
    type: String,
    default: null,
  },
  strIngredient2: {
    type: String,
    default: null,
  },
  strIngredient3: {
    type: String,
    default: null,
  },
  strIngredient4: {
    type: String,
    default: null,
  },
  strIngredient5: {
    type: String,
    default: null,
  },
  strIngredient6: {
    type: String,
    default: null,
  },
  strIngredient7: {
    type: String,
    default: null,
  },
  strIngredient8: {
    type: String,
    default: null,
  },
  strIngredient9: {
    type: String,
    default: null,
  },
  strIngredient10: {
    type: String,
    default: null,
  },
  strIngredient11: {
    type: String,
    default: null,
  },
  strIngredient12: {
    type: String,
    default: null,
  },
  strIngredient13: {
    type: String,
    default: null,
  },
  strIngredient14: {
    type: String,
    default: null,
  },
  strIngredient15: {
    type: String,
    default: null,
  },
  strIngredient16: {
    type: String,
    default: null,
  },
  strIngredient17: {
    type: String,
    default: null,
  },
  strIngredient18: {
    type: String,
    default: null,
  },
  strIngredient19: {
    type: String,
    default: null,
  },
  strIngredient20: {
    type: String,
    default: null,
  },

  strMeasure1: {
    type: String,
    default: null,
  },
  strMeasure2: {
    type: String,
    default: null,
  },
  strMeasure3: {
    type: String,
    default: null,
  },
  strMeasure4: {
    type: String,
    default: null,
  },
  strMeasure5: {
    type: String,
    default: null,
  },
  strMeasure6: {
    type: String,
    default: null,
  },
  strMeasure7: {
    type: String,
    default: null,
  },
  strMeasure8: {
    type: String,
    default: null,
  },
  strMeasure9: {
    type: String,
    default: null,
  },
  strMeasure10: {
    type: String,
    default: null,
  },
  strMeasure11: {
    type: String,
    default: null,
  },
  strMeasure12: {
    type: String,
    default: null,
  },
  strMeasure13: {
    type: String,
    default: null,
  },
  strMeasure14: {
    type: String,
    default: null,
  },
  strMeasure15: {
    type: String,
    default: null,
  },
  strMeasure16: {
    type: String,
    default: null,
  },
  strMeasure17: {
    type: String,
    default: null,
  },
  strMeasure18: {
    type: String,
    default: null,
  },
  strMeasure19: {
    type: String,
    default: null,
  },
  strMeasure20: {
    type: String,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const meal = mongoose.model("meal", mealSchema);

module.exports = meal;
