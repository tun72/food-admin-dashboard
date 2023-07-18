const express = require("express");
const mongoose = require("mongoose");
const path = require('path')

const ingredientRouter = require("./router/ingredientRouter");
const viewRouter = require("./router/viewRouter");
const bodyParser = require("body-parser")
const app = express();

app.set('view engine', 'pug');

app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/api/ingredients", ingredientRouter);
app.use("/admin", viewRouter);

app.use(express.static(`${__dirname}/public`));


mongoose
  .connect(
    "mongodb+srv://admin:ED0sxlcqbUhjlioH@cluster0.31boi7p.mongodb.net/ingredients?retryWrites=true",
    {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: true,
      useUnifiedTopology: true,
    }
  )
  .then((conn) => {
    console.log("Database is successfully connected ✅");
  });

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Server is running at port " + port);
});
