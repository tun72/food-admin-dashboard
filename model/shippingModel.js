const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "User can't null"],
    ref: "user",
  },

  ingredients: [
    {
      ingredient: {
        type: mongoose.Schema.ObjectId,
        required: [true, "A cart must have ingredient."],
        ref: "ingredient",
      },
      quantity: {
        type: Number,
        required: [true, "A cart must have quantity"],
      },
    },
  ],

  payment: {
    type: String,
    required: [true, "Shippng must have ingredient"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const shipping = mongoose.model("shipping", shippingSchema);

module.exports = shipping;
