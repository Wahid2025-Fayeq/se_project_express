const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
  email: {
    type: String,
    required: [true, "The `email` field is required"],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: [true, "The `password` field is required"],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
