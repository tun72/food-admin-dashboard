const Ingredient = require("../model/ingredientModel");

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

}
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
  const { name, price, imageUrl, rating, description,category, quantity, page } = req.body;
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


// get login

exports.getLoginForm = (req, res, next) => {
  return res.status(200).render("login");
}