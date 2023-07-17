const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//signup
const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "Signup Was Successfully",
    });
  } catch {
    res.status(500).json({
      message: "Singup failed",
    });
  }
};

//login

const login = async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        // generate token
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        res.status(200).json({
          access_toke: token,
          message: "Login successfull",
        });
      } else {
        res.status(401).json({
          error: "Authentication failed",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failed",
      });
    }
  } catch {
    res.status(401).json({
      error: "Authentication failed",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("todos");
    res.status(200).json({
      data: users,
      message: "Successfully",
    });
  } catch {
    res.status(500).json({
      message: "There was an server side error",
    });
  }
};

module.exports = {
  signup,
  login,
  getAllUsers,
};
