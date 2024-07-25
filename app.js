const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const ingredientRouter = require("./router/ingredientRouter");
const viewRouter = require("./router/viewRouter");
const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const mealRouter = require("./router/mealsRouter");

// model
const User = require("./model/userModel");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config.env" });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

app.use("/docs", express.static(path.join(__dirname, "docs")));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(cookieParser());

app.use("/api/ingredients", ingredientRouter);
app.use("/api/recipes", mealRouter);
app.use("/api/user", userRouter);
app.use("/admin", viewRouter);
app.use("/", authRouter);

app.use(express.static(`${__dirname}/public`));

const URL = process.env.MONGODB_URL;
const port = process.env.PORT || 4000;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then((_) => {
    return User.findOne({ email: "admin@gmail.com" })
      .select("+password")
      .then((user) => {
        console.log(user);
        if (!user) {
          return User.create({
            name: "admin",
            email: "admin@gmail.com",
            password: "admin123",
            passwordConfirm: "admin123",
            role: "admin",
          });
        }
        return user;
      });
  })
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running at port " + port);
    });

    console.log("Database is successfully connected ✅");
  })
  .catch((err) => {
    console.log(err);
  });
