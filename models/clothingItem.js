const mongoose = require("mongoose");
const validator = require("validator");

const clothingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },

  imageURL: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: "Invalid image URL",
    },
  },
});

module.exports = mongoose.model("clothingItems", clothingSchema);
