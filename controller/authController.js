const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signupUser = async (req, res, next) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    const token = signToken(newUser._id);

    const cookieOption = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 31
      ),
      httpOnly: true,
    };


    res.cookie("jwt", token, cookieOption);

    res.user = newUser;
    res.locals.user = newUser;

    res.status(200).json({
      message: "success",
      token,
      data: {
        newUser,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(500).json({
        message: "Not Found",
      });

    const check = await bcrypt.compare(password, user.password);

    if (!check) return res.status(404).json({ message: "Password Wrong" });

    const token = signToken(user._id);

    const cookieOption = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    req.user = user;
    req.locals.user = user;

    res.cookie("jwt", token, cookieOption);

    // res.status(200).redirect("/admin");
    res.status(200).json({
      message: "success",
      token,
    });
  } catch (err) {
    console.log(err);
  }
};


exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(500).json({
        message: "Not Found",
      });

    if(user.role != "admin") {
      return res.status(500).json({
        message: "No Admin Account",
      });
    }

    const check = await bcrypt.compare(password, user.password);

    if (!check) return res.status(404).json({ message: "Password Wrong" });

    const token = signToken(user._id);

    const cookieOption = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    console.log("hello");

    console.log(user);
    req.user = user;
    // req.locals.user = user;

    res.cookie("jwt", token, cookieOption);

    res.status(200).redirect("/admin");
  } catch (err) {
    console.log(err);
  }
};


exports.protect = async (req, res, next) => {
  let token;
  try {
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(500).redirect("/login");
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(500).redirect("/login");
    }
  

    req.user = user;
    res.locals.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
};

exports.logOut = (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).redirect("/login");
};
