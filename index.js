require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const todoRoute = require("./routes/todoRoute");
const userRoute = require("./routes/userRoute");

// express application initialization"
const app = express();

//middlewares
app.use(express.json());

// data base connection with mongoose
mongoose
  .connect("mongodb://localhost/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/todo", todoRoute);

app.use("/user", userRoute);

const errorHander = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHander);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
