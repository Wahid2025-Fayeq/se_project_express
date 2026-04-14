

const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The `name` field is required"],
    minlength: [2, "The minimum allowed name length is 2"],
    maxlength: [30, "The maximum allowed name length is 30"],
  },
  avatar: {
    type: String,
    required: [true, "The `avatar` field is required"],
    validate: {
      validator: (value) => validator.isURL(value),
      message: "Invalid avatar URL",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
