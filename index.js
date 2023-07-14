const express = require("express");
const mongoose = require("mongoose");
const todoRoute=require('./routes/todoRoute')
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

  app.use('/todo',todoRoute);


app.listen(3000, () => {
  console.log("listening on port 3000");
});
