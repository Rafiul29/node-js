// external import
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// internal import
const {
  notFoundaHandler,
  errorHandler,
} = require("./middlewares/common/errorHandlers");
const loginRouter = require("./router/loginRouter");
const inboxRouter = require("./router/inboxRouter");
const usersRouter = require("./router/usersRouter");


const app = express();

dotenv.config();

// data base connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Date base connection succsessfull");
  })
  .catch((err) => console.log(err));

  
//request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 not found handlers
app.use(notFoundaHandler);

//error handling
app.use(errorHandler);

// listen server
app.listen(process.env.PORT, () => {
  console.log(`listening on server url http://localhost:${process.env.PORT}/`)
});
