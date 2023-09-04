const Shipping = require("../model/shippingModel");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");
exports.createPdf = async (id) => {
  const options = {
    formate: "A4",
    orientation: "portrait",
    border: "2mm",
    header: {
      height: "15mm",
      contents:
        '<h4 style=" color: red;font-size:20;font-weight:800;text-align:center;">Recipes</h4>',
    },
    footer: {
      height: "20mm",
      contents: {
        first: "Cover page",
        2: "Second page",
        default:
          '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
        last: "Last Page",
      },
    },
  };
  const html = fs.readFileSync(
    path.join(__dirname, "../views/template.html"),
    "utf-8"
  );
  const filename = Math.random() + "_doc" + ".pdf";
  let array = [];

  const shipping = await Shipping.findById(id)
    .populate("userId")
    .populate("ingredients.ingredient");

  let totalPrice = 5;

  const ingredient = [];
  shipping.ingredients.forEach((ing) => {
    totalPrice += ing.ingredient.price * ing.quantity;
    ingredient.push({name: ing.ingredient.name, quantity: ing.quantity, price: ing.ingredient.price})
  });
  

  
  const document = {
    html: html,
    data: {
      totalPrice,
      ings : {
        ingredient
      },
      name: shipping.userId.name,
      address: shipping.userId.address
    },
    path: "./docs/" + filename,
  };
  await pdf.create(document, options);

  return filename;
};
