const { validationResult } = require("express-validator");
module.exports = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    console.log(result.mapped());
   
    return res.render("ingredientForm", {
      message: result.mapped() || {},
      oldData: req.body,
    });
  }

  return next();
};
