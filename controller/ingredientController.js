const Ingredient = require("../model/ingredientModel");
const Cart = require("../model/cartModel");
const Shippng = require("../model/shippingModel");
const User = require("../model/userModel");
const util = require("../util/createPdf");
exports.getAllIngredients = async (req, res, next) => {
  try {
    const page = +req.query.page || 1;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const limit = 16;
    const skip = (page - 1) * limit;
    const end = page * limit;
    let nextPage = 0;
    let prevPage = 0;

    const ingredients = await Ingredient.find({
      name: { $regex: search, $options: "i" },
      category: { $regex: category },
    })
      .skip(skip)
      .limit(limit);

    const title = "Ingredients List";

    const total = await Ingredient.find({
      name: { $regex: search, $options: "i" },
      category: { $regex: category },
    }).count();

    if (end < total) nextPage = page + 1;
    if (page - 1 > 0) prevPage = page - 1;

    return res.status(200).json({
      message: "success",
      ingredients,
      title,
      nextPage,
      prevPage,
      total,
      end: end - limit,
    });
  } catch (err) {
    res.status(500).json({
      message: "fail",
      err,
    });
  }
};

exports.postIngredients = async (req, res, next) => {
  try {
    await Ingredient.create(req.body);

    return res.status(200).redirect("/admin");
  } catch (err) {
    res.status(500).json({
      message: "fail",
      err,
    });
  }
};

exports.getIngredientByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      name,
      price,
      _id,
      category,
      description,
      imageUrl,
      rating,
      quantity,
    } = (await Ingredient.findById(id)) || null;

    console.log(name);
    if (!name) {
      return res.status(500).json({
        message: "No Ingredient Found!",
      });
    }

    return res.status(200).json({
      message: "success",
      name,
      price,
      _id,
      category,
      description,
      imageUrl,
      rating,
      quantity,
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
      status: "fail",
    });
  }
};

exports.getIngredientByName = async (req, res, next) => {
  try {
    const name = req.params.name;
    const ingredients = await Ingredient.find({
      name: { $regex: name, $options: "i" },
    });

    res.status(200).json({
      ingredients,
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
      status: "fail",
    });
  }
};

exports.getIngredientCategory = async (req, res, next) => {
  try {
    const name = req.query.name || null;

    if (!name) {
      const category = await Ingredient.find()
        .select({ category: 1, _id: 0 })
        .distinct("category");

      return res.status(200).json({
        message: "success",
        category,
      });
    }

    const ingredients = await Ingredient.find({ category: name });
    return res.status(200).json({
      message: "success",
      ingredients,
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
      status: "fail",
    });
  }
};

exports.postCart = async (req, res, next) => {
  try {
    const id = req.body.id;
    const type = req.body.quantity || 1;

    let quantity, cart;

    quantity = type;
    const isAlready = await Cart.findOne({ ingredient: id });

    if (isAlready && quantity === 1) {
      quantity = quantity + isAlready.quantity;
    }

    if (isAlready) {
      if (quantity <= 0) {
        cart = await Cart.findByIdAndDelete(isAlready._id);

        return res.status(200).json({
          message: "success",
          cart,
        });
      }

      cart = await Cart.findByIdAndUpdate(isAlready._id, {
        quantity,
        userId: req.user,
      });
      return res.status(200).json({
        message: "success",
        cart,
      });
    }

    cart = await Cart.create({ ingredient: id, quantity, userId: req.user });

    res.status(200).json({
      message: "success",
      cart,
    });
  } catch (err) {
    res.status(200).json({
      message: "fail",
      err,
    });
  }
};

exports.patchCart = async (req, res, next) => {
  try {
    const id = req.body.id;
    let quantity = req.body.quantity;
    let cart;
    const isAlready = await Cart.findOne({ ingredient: id });
    if (isAlready && quantity) {
      cart = await Cart.findByIdAndUpdate(isAlready._id, {
        quantity,
        userId: req.user,
      });

      return res.status(200).json({
        message: "success",
        cart,
      });
    }

    res.status(200).json({
      message: "success",
      cart,
    });
  } catch (err) {
    res.status(200).json({
      message: "fail",
      err,
    });
  }
};
exports.getCart = async (req, res, next) => {
  try {
    const isTotal = req.query.total || null;

    const carts = await Cart.find({ userId: req.user }).populate("ingredient");

    let totalPrice = 0;

    let total = carts.length;
    if (isTotal) {
      carts.forEach((c, i) => {
        totalPrice += c.ingredient.price * c.quantity;
      });

      return res.status(200).json({
        message: "success",
        total: totalPrice,
        totalItem: total,
      });
    }
    res.status(200).json({
      message: "success",
      carts,
    });
  } catch (err) {
    res.status(200).json({
      message: "fail",
      err,
    });
  }
};

exports.postShipping = async (req, res, next) => {
  try {
    let shipArray = [];
    const carts = (await Cart.find({ userId: req.user })) || [];

    carts.forEach(async (cart) => {
      shipArray = [
        ...shipArray,
        { ingredient: cart.ingredient, quantity: cart.quantity },
      ];
      await Cart.findByIdAndDelete(cart._id);
    });

    if (shipArray.length <= 0) {
      return res.status(500).json({
        message: "fail",
        err,
      });
    }
    await User.findByIdAndUpdate(req.user, {
      address: req.body.address,
      city: req.body.city,
      zipcode: req.body.zip,
    });

    let shipping = await Shippng.create({
      ingredients: shipArray,
      userId: req.user,
      payment: req.body.payment,
    });

    let id = shipping._id;

    const path = await util.createPdf(shipping._id);

    shipping = await Shippng.findByIdAndUpdate(shipping._id, {
      filePath: path,
    });

    res.status(200).json({
      message: "success",
      filePath: path,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      message: "fail",
      err,
    });
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const status  = req.query.status;

    console.log(status);

    let shipping = await Shippng.find({ userId: req.user.id })
      .populate("userId")
      .populate("ingredients.ingredient");

      

      

    // if (status !== "null" && status !== "all") {
    //   shipping = shipping.filter((shop) => {
    //     return shop.status.toLowerCase() === status.toLowerCase();
    //   });
    // }

    // console.log(shipping);

    if (!shipping) {
      return res.status(200).json({
        message: "Fail user not oredered!",
      });
    }

    


    res.status(200).json({
      message: "success",
      shipping,
    });
  } catch (err) {
    res.status(200).json({
      message: "fail",
      err,
    });
  }
};

exports.getByNames = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find({
      name: { $in: req.body.data },
    });

    res.status(200).json({
      message: "success",
      ingredients,
    });
  } catch (err) {
    res.status(200).json({
      message: "fail",
      err,
    });
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const id = req.body.id;
    const status = req.query.status;

    if (status === "all") {
      console.log(status);
      await Cart.deleteMany({userId: req.userId});
      return res.status(200).json({
        message: "success",
      });
    }

    const cart = await Cart.deleteOne({ ingredient: id });

    return res.status(200).json({
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: "fail",
    });
  }
};
