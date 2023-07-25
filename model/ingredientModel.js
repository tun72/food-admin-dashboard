const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An ingredient must have name."],
    unique: [true, "An ingredient name must be unique."],
    maxlength: [
      40,
      "An ingredients name must have less than or equal than 40 characters",
    ],
    minlength: [
      3,
      "A ingredients name must have greater than or equal than 10 characters",
    ],
  },
  imageUrl: {
    type: String,
    required: [true, "An ingredients must have image."],
  },
  description : {
    type: String,
    required: [true, "An ingredients must have description"],
    maxlength: [
      100,
      "An ingredients description name must have less than or equal than 100 characters",
    ],
    minlength: [
      5,
      "A ingredients description name must have greater than or equal than 5 characters",
    ],
  },
  rating : {
    type: Number,
    required: [true, "An ingredients must have rating."]
  },
  quantity: {
    type: Number,
    required: [true, "An ingredients must have quantity."]
  },
  price: {
    type: Number,
    required: [true, "An ingredient must have price."]
  }
});

ingredientSchema.virtual('total').get(async function () {
  
  return count(this.name);
});

// ingredientSchema.pre(/^find/, async function (next) {
//   // /^find/ all string start with find
//   // this.find({ secretTour: { $ne: true } });

//   this.total = await this.find().count();
//   console.log(this.total);
//   next();
// });

const Ingredient = mongoose.model('ingredient', ingredientSchema);

module.exports = Ingredient;
