const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
    },
    todos:[
      {
        type:mongoose.Types.ObjectId,
        ref:"Todo"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
