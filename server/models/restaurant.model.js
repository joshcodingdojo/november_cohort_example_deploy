const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    // [true/false, "Error Message to send to client"]
    required: [true, "Restaurant Name required"],
    minLength: [7, "Restaurant Name must be at least 7 characters"],
  },
  cuisineType: {
    type: String,
    required: [true, "Cuisine Type is required"],
    enum: {
      values: ["Mexican", "American", "Chinese"],
      message: "cuisineType must be Mexican, American, or Chinese",
    },
  },
  delivery: {
    type: Boolean,
    default: false,
  },
  dishImgUrl: {
    type: String,
    required: [true, "You must add a dish image URL"],
  },
  dishes: [],
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;
