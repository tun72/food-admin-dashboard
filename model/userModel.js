const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "A user must have email"],
  },
  password: {
    type: String,
    required: [true, "A user must have name"],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user must have a password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not same",
    },
  },
  role : {
    type: String,
    default: "User",
  },
  address: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  zipcode: {
    type: Number,
    default: "",
  }
});

userSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = null;
    next();
})
// userSchema.virtual()

const User = mongoose.model("user", userSchema);

module.exports = User;
