// external import
const { check, validationResult } = require("express-validator");
const User = require("../../model/people");
const { unlink } = require("fs");
const path = require("path");
const createError = require("http-errors");
//add user

const addUserValidators = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name must not contain anything order than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already is use");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile number must be a valid bangladeshi mobile number")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("mobile already is use");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "password must be at least characters long & should contain at lest 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

const addUserValidationHandlers = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];

      unlink(
        path.join(__dirname, `/../../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};
module.exports = {
  addUserValidators,
  addUserValidationHandlers,
};
