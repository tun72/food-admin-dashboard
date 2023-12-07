const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const ingredientRouter = require("./router/ingredientRouter");
const viewRouter = require("./router/viewRouter");
const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const mealRouter = require("./router/mealsRouter");

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config.env" });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

app.use('/docs', express.static(path.join(__dirname, 'docs')));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json())

app.use(cookieParser())

app.use("/api/ingredients", ingredientRouter);
app.use("/api/recipes",mealRouter);
app.use("/api/user", userRouter);
app.use("/admin", viewRouter);
app.use("/", authRouter);
app.use(function(error, req, res, next){})

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
