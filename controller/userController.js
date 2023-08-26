const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.getUser = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);

    res.status(200).json({
      user,
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      err,
      message: "fail",
    });
  }
};

exports.postEditUser = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findByIdAndUpdate(id, req.body);

    res.status(200).json({
      user,
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      err,
      message: "fail",
    });
  }
};

exports.postEdiPassword = async (req, res, next) => {
  try {
    const id = req.user._id;
    const password = req.body.password;

    const newPassword = req.body.newPassword;
    const confPassword = req.body.confPassword;

    const user = await User.findById(id).select({ password: 1 });

    if (!user) {
      res.status(500).json({
        status: "fail",
        message: "User not found",
      });
    }

    // console.log(await bcrypt.compare(password, user.password));
    const check = await bcrypt.compare(password, user.password);

    console.log(check);

    if (!check) {
      res.status(500).json({
        status: "fail",
        message: "Password not correct",
      });
    }

    user.password = newPassword;
    user.passwordConfirm = confPassword;

    await user.save();

    console.log(user);

    res.status(200).json({
      user,
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      err,
      message: "fail",
    });
  }
};
