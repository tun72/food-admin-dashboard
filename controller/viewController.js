const Ingredient = require("../model/ingredientModel");
const Meal = require("../model/mealsModel");
const User = require("../model/userModel");

// Form

// 1) GET
exports.getIngredientsForm = (req, res, next) => {
  const title = "New Ingredients";
  const isUpdate = false;
  return res.status(200).render("ingredientForm", {
    title,
    isUpdate,
  });
};
const getFinalPage = async () => {
  const total = await Ingredient.find().count();
  return Math.ceil(total / 10);
};
// 2) POST
exports.postIngredientsForm = async (req, res, next) => {
  try {
    await Ingredient.create(req.body);
    const finalPage = await getFinalPage();
    return res.status(200).redirect(`/admin?page=${finalPage}`);
  } catch (err) {
    return res.status(200).json({
      message: "Something wrong",
    });
  }
};

// 3) Update
exports.getUpdateIngredientsForm = async (req, res, next) => {
  try {
    const id = req.params.id;
    const ingredient = await Ingredient.findById(id);
    const isUpdate = true;
    const page = +req.query.page || 1;
    return res.status(200).render("ingredientForm", {
      ingredient,
      isUpdate,
      page,
      title: "Update Ingredients",
    });
  } catch (err) {
    return res.status(200).json({
      message: "Something wrong",
    });
  }
};

// 4) Patch
exports.patchUpdateIngredientsForm = async (req, res, next) => {
  const id = req.body.id;
  const {
    name,
    price,
    imageUrl,
    rating,
    description,
    category,
    quantity,
    page,
  } = req.body;
  const ingredient = await Ingredient.findByIdAndUpdate(id, {
    name,
    price,
    imageUrl,
    rating,
    description,
    category,
    quantity,
  });
  const isUpdate = true;

  return res.status(200).redirect(`/admin?page=${page}`);
};

// 5) Delete
exports.deleteIngredients = async (req, res, next) => {
  const id = req.body.id;
  await Ingredient.findByIdAndDelete(id);
  return res.status(200).redirect("/admin");
};

exports.getIngredientsList = async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const end = page * limit;
  let nextPage = 0;
  let prevPage = 0;

  const ingredients = await Ingredient.find().skip(skip).limit(limit);

  const title = "Ingredients List";

  const total = await Ingredient.find().count();

  if (end < total) nextPage = page + 1;
  if (page - 1 > 0) prevPage = page - 1;

  return res.status(200).render("ingredientList", {
    ingredients,
    title,
    nextPage,
    prevPage,
    total,
    end: end - limit,
  });
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).render("userList", {
    users,
    total: users.length,
    title: "All Users",
  });
};

exports.deleteUser = async (req, res, next) => {
  const users = await User.findByIdAndDelete(req.body.id);
  res.status(200).redirect("/admin/users");
};

exports.updateUser = async (req, res, next) => {
  console.log(req.params);
  const user = await User.findById(req.params.id);
  console.log(user);
  res.status(200).render("userForm", {
    user,
    title: "edit user",
  });
};

exports.saveUser = async (req, res, next) => {
  const { name, email, address, city, role, phone } = req.body;
  const users = await User.findByIdAndUpdate(req.body.id, {
    name,
    email,
    address,
    city,
    role,
    phone,
  });

  res.status(200).redirect("/admin/users");
};

// meal
exports.mealList = async (req, res, next) => {
  const title = "All Meals";
  const meals = await Meal.find();

  meals.forEach((meal, index) => {
    let i = 1;
    let ingText = "";
    let meaText = "";
    while (i != 20) {
      ingText += (meal[`strIngredient${i}`] || '') + ",";
      meaText += (meal[`strMeasure${i}`]  || '') + ",";
      i++;
    }
    meals[index].ingText = ingText + "\n" + meaText;
  });

  return res.status(200).render("mealList", {
    title,
    meals,
    total: meals.length,
  });
};

exports.getMealForm = async (req, res, next) => {
  const title = "New Meals";
  const isUpdate = false;
  return res.status(200).render("mealForm", {
    title,
    isUpdate,
  });
};

exports.postMealForm = async (req, res, next) => {
  try {

    console.log(req.body);
    const meals = await Meal.create(req.body);


    return res.status(200).redirect(`/admin/meals`);
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      message: "Something wrong",
    });
  }
};



exports.getEditMealForm = async (req, res, next) => {
  try {
    const meal = await Meal.findById(req.params.id);


    return res.status(200).render(`mealForm`, {
      meal,
      isUpdate : true,
      title: "Update Meals",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      message: "Something wrong",
    });
  }
};

exports.postEditMealForm = async (req, res, next) => {
  try {
    const meals = await Meal.findByIdAndUpdate(req.body.id, req.body);

    return res.status(200).redirect(`/admin/meals`);
    
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      message: "Something wrong",
    });
  }
};

exports.deleteMeal = async (req, res, next) => {
  try {
    const meals = await Meal.findByIdAndDelete(req.body.id);

    return res.status(200).redirect(`/admin/meals`);
    
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      message: "Something wrong",
    });
  }
};



exports.getOrderList = async (req, res, next) => {

}
// get login

exports.getLoginForm = (req, res, next) => {
  return res.status(200).render("login");
};
