const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "User can't null"],
    ref: "user",
  },
  ingredient: {
    type: mongoose.Schema.ObjectId,
    required: [true, "A cart must have ingredient."],
    ref: "ingredient",
  },
  quantity: {
    type: Number,
    required: [true, "A cart must have quantity"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;
